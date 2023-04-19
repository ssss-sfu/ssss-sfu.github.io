import React, { useEffect, useState } from 'react';
// import { Calendar } from 'react-calendar'
import { Calendar, dateFnsLocalizer} from 'react-big-calendar';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

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


export default function EventsCalendar() {
  const calendarURL = 'https://clients6.google.com/calendar/v3/calendars/j7qfcngd9crbhelib6tgdihi3k@group.calendar.google.com/events?calendarId=j7qfcngd9crbhelib6tgdihi3k%40group.calendar.google.com&singleEvents=true&timeZone=America%2FVancouver&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2023-03-26T00%3A00%3A00-07%3A00&timeMax=2023-05-07T00%3A00%3A00-07%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs';

  const events = [];

  useEffect(() => {
    fetch(calendarURL).then((response) => {
      response.json().then((data) => {
        for (const event of data.items) {
          events.push({title: event.summary, start: new Date(event.start.dateTime), end: new Date(event.end.dateTime)});
        };
        console.log(events);
      });
    });
  }, []);

  return (
    <div>
      <Calendar 
        // onChange={onChange}
        localizer={localizer}
        // value={value}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: "50px" }}
        />
    </div>
  );
}