import test from 'node:test';
import assert from 'node:assert/strict';
import { upcomingEvents, eventDate } from '../apps/web/src/lib/directory-events.ts';
const event = (id,start,end=start) => ({id,slug:id,title:id,start_date:start,end_date:end});
test('past events disappear while ongoing and future events remain ordered',()=>{
 const result=upcomingEvents([event('future','2026-11-01'),event('past','2026-10-23'),event('ongoing','2026-10-24','2026-10-26'),event('today','2026-10-25')],'2026-10-25');
 assert.deepEqual(result.map(e=>e.id),['ongoing','today','future']);
});
test('missing dates, reversed ranges and missing routes do not become event cards',()=>{
 assert.deepEqual(upcomingEvents([event('missing',''),event('reversed','2026-11-02','2026-11-01'),{...event('route','2026-11-01'),slug:''}],'2026-10-25'),[]);
});
test('date labels preserve the advertised calendar day across time zones',()=>{
 assert.equal(eventDate('2026-10-25T00:00:00Z'),'Oct 25, 2026');
});
