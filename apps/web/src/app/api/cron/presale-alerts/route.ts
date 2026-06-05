import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@rpv/supabase/admin';
import { notificationService } from '@rpv/supabase/services/notificationService';

/**
 * Cron: 48-hour "pre-sale is live" alerts.
 * When an expo's pre-sale window opens (48h before start) and it has staged inventory,
 * email every Premium collector once, then stamp events.presale_alert_sent_at so it
 * never repeats. Schedule this hourly (e.g. Vercel cron) hitting:
 *   /api/cron/presale-alerts?key=$CRON_SECRET
 * See implementation_plan.md §5.
 */
export const dynamic = 'force-dynamic';

const WINDOW_HOURS = 48;

const eventStart = (e: any): number | null => {
  const raw = e.date_start || e.start_date;
  return raw ? new Date(raw).getTime() : null;
};

export async function GET(request: Request) {
  try {
    // Accept either ?key=$CRON_SECRET or Vercel's automatic Authorization: Bearer $CRON_SECRET.
    const { searchParams } = new URL(request.url);
    const secret = process.env.CRON_SECRET;
    if (secret) {
      const key = searchParams.get('key');
      const authHeader = request.headers.get('authorization');
      if (key !== secret && authHeader !== `Bearer ${secret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://rareplantvendors.com';
    const now = Date.now();

    // Events not yet alerted.
    const { data: events, error } = await supabaseAdmin
      .from('events')
      .select('id, title, slug, start_date, date_start, presale_alert_sent_at')
      .is('presale_alert_sent_at', null);
    if (error) throw error;

    // Only those whose 48h pre-sale window is currently open.
    const dueEvents = (events || []).filter((e: any) => {
      const startMs = eventStart(e);
      if (startMs == null) return false;
      const opensAt = startMs - WINDOW_HOURS * 3600 * 1000;
      return now >= opensAt && now < startMs;
    });

    if (dueEvents.length === 0) {
      return NextResponse.json({ success: true, events_alerted: 0, emails_sent: 0, timestamp: new Date().toISOString() });
    }

    // Premium collector cohort (fetched once, reused per event).
    const { data: premium } = await supabaseAdmin
      .from('collectors')
      .select('user_id, full_name')
      .eq('tier', 'premium');
    const cohort = premium || [];

    let eventsAlerted = 0;
    let emailsSent = 0;

    for (const evt of dueEvents) {
      // Must have staged inventory to be worth alerting.
      const { data: staged } = await supabaseAdmin
        .from('inventory')
        .select('id')
        .eq('event_id', (evt as any).id)
        .in('status', ['available', 'reserved']);
      const plantCount = staged?.length ?? 0;
      if (plantCount === 0) continue; // leave unsent — may stage later within the window

      const eventUrl = `${appUrl}/events/${(evt as any).slug}`;

      for (const c of cohort) {
        try {
          const { data: u } = await supabaseAdmin.auth.admin.getUserById((c as any).user_id);
          const email = u?.user?.email;
          if (!email) continue;
          await notificationService.sendPresaleLiveAlert(email, (c as any).full_name || '', (evt as any).title, eventUrl, plantCount);
          emailsSent++;
        } catch (mailErr) {
          console.error(`Presale alert email failed for collector ${(c as any).user_id}:`, mailErr);
        }
      }

      await supabaseAdmin
        .from('events')
        .update({ presale_alert_sent_at: new Date().toISOString() })
        .eq('id', (evt as any).id);
      eventsAlerted++;
    }

    return NextResponse.json({
      success: true,
      events_alerted: eventsAlerted,
      emails_sent: emailsSent,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Presale-alerts cron error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
