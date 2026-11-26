import { afterEach, expect, test } from "bun:test";
import { fetchEvents } from "./events";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
  delete process.env.GOOGLE_CALENDAR_API_KEY;
});

const mockFetch = (status: number, body: unknown) => {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;
};

test("no key: empty calendar, no request", async () => {
  mockFetch(500, {});
  expect(await fetchEvents()).toEqual([]);
});

test("maps all-day and timed events; drops ones without dates", async () => {
  process.env.GOOGLE_CALENDAR_API_KEY = "test";
  mockFetch(200, {
    items: [
      {
        summary: "Hackathon",
        start: { date: "2026-11-26" },
        end: { date: "2026-11-27" },
      },
      {
        summary: "Social",
        location: "SFU Surrey",
        start: { dateTime: "2026-11-26T18:00:00-08:00" },
        end: { dateTime: "2026-11-26T20:00:00-08:00" },
      },
      { summary: "Broken" },
    ],
  });
  expect(await fetchEvents()).toEqual([
    {
      title: "Hackathon",
      start: "2026-11-26",
      end: "2026-11-27",
      allDay: true,
    },
    {
      title: "Social",
      start: "2026-11-26T18:00:00-08:00",
      end: "2026-11-26T20:00:00-08:00",
      allDay: false,
      location: "SFU Surrey",
    },
  ]);
});

test("key set but request fails: throws so the build stops", async () => {
  process.env.GOOGLE_CALENDAR_API_KEY = "test";
  mockFetch(403, { error: {} });
  expect(fetchEvents()).rejects.toThrow("403");
});
