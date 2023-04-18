import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function EventsCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}