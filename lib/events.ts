import { addMonths, subMonths } from "date-fns";

const CALENDAR_ID = "j7qfcngd9crbhelib6tgdihi3k@group.calendar.google.com";

// raw Google values: "2026-11-26" for all-day events, a full timestamp otherwise
export type CalendarEvent = {
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  location?: string;
};

/**
 * Fetches events at build time, 3 months back to 6 months ahead, so they are in
 * the HTML for search engines and the API key never reaches the browser.
 */
export async function fetchEvents(): Promise<CalendarEvent[]> {
  const key = process.env.GOOGLE_CALENDAR_API_KEY;
  // no key (local dev, fork PRs): build with an empty calendar
  if (!key) return [];

  const now = new Date();
  const params = new URLSearchParams({
    key,
    timeMin: subMonths(now, 3).toISOString(),
    timeMax: addMonths(now, 6).toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "2500", // the API max; the default of 250 would silently cut events
  });
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`
  );
  // key set but failing: fail the build so the last good deploy stays live
  if (!res.ok) {
    throw new Error(`Google Calendar request failed (${res.status})`);
  }
  const data = await res.json();

  return (data.items ?? []).flatMap(
    (e: {
      summary?: string;
      location?: string;
      start?: { dateTime?: string; date?: string };
      end?: { dateTime?: string; date?: string };
    }) => {
      const start = e.start?.dateTime || e.start?.date;
      const end = e.end?.dateTime || e.end?.date;
      if (!start || !end) return [];
      return [
        {
          title: e.summary ?? "",
          start,
          end,
          allDay: !e.start?.dateTime,
          // page props must be JSON: omit the key rather than send undefined
          ...(e.location ? { location: e.location } : {}),
        },
      ];
    }
  );
}
