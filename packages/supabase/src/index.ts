// @rpv/supabase — Barrel export for all Supabase utilities
export { createClient as createBrowserClient } from './client';
export { createClient as createServerClient } from './server';
export { updateSession } from './middleware';
export { supabaseAdmin } from './admin';
export { notificationService } from './services/notificationService';
export { wishlistMatchService } from './services/wishlistMatchService';
