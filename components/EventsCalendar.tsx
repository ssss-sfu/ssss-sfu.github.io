import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { isToday, parseISO } from "date-fns";
import type { CalendarEvent } from "@lib/events";

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

export const EventsCalendar: React.FC<{ events: CalendarEvent[] }> = ({
  events,
}) => {
  // parseISO reads a date-only "2026-11-26" as local midnight;
  // new Date() would read it as UTC and land on the previous day here
  const calendarEvents = events.map((e) => ({
    title: e.title,
    start: parseISO(e.start),
    end: parseISO(e.end),
    allDay: e.allDay,
  }));

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
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 750 }}
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
};
