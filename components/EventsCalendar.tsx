import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { addMonths, isToday, subMonths } from "date-fns";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const EventsCalendar: React.FC = () => {
  const googleCalendarID =
    "j7qfcngd9crbhelib6tgdihi3k%40group.calendar.google.com";
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Will fetch events from Google Calendar API
    // Within a time range of 3 months in the past to 6 months in the future
    const now = new Date();
    const timeMin = subMonths(now, 3).toISOString();
    const timeMax = addMonths(now, 6).toISOString();

    const calendarURL = `https://www.googleapis.com/calendar/v3/calendars/${googleCalendarID}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

    fetch(calendarURL)
      .then((response) => response.json())
      .then((data) => {
        const updatedEvents: any[] = [];
        if (data.items) {
          for (const event of data.items) {
            // Handles both all-day and timed events
            const start = event.start?.dateTime || event.start?.date;
            const end = event.end?.dateTime || event.end?.date;
            if (start && end) {
              updatedEvents.push({
                title: event.summary,
                start: new Date(start),
                end: new Date(end),
              });
            }
          }
        }
        setEvents(updatedEvents);
      })
      // catch block to display errors
      .catch((error) => {
        console.error("Error fetching calendar events:", error);
      });
  }, []);

  const dayPropGetter = (date: Date) => {
    if (isToday(date)) {
      return {
        className: "today",
      };
    }
    return {};
  };

  return (
    <div className="eventsCalendar">
      <Calendar
        localizer={localizer}
        onSelectEvent={() => {
          window.open("https://discord.com/invite/whdfmJbVF7", "_blank");
        }}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 750 }}
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
};
