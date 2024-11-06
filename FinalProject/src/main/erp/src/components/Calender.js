import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomCalendar.css';

const localizer = momentLocalizer(moment);

function MyBigCalendar() {
  const [events, setEvents] = useState([]);

  // 서버에서 일정 데이터를 불러오기
  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map(event => ({
          ...event,
          start: new Date(event.date),
          end: new Date(event.date),
        }));
        setEvents(formattedData);
      });
  }, []);

// 일정 추가
const handleSelect = ({ start }) => {
  const title = window.prompt('새 일정 제목:');
  if (title) {
    const newEvent = { date: start, title };
    fetch('http://localhost:8080/api/add', { // POST URL 확인
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((event) => {
        setEvents((prevEvents) => [
          ...prevEvents,
          { ...event, start: new Date(event.date), end: new Date(event.date) },
        ]);
      });
  }
};

// 일정 삭제
const handleEventClick = (event) => {
  if (window.confirm(`"${event.title}" 일정을 삭제하시겠습니까?`)) {
    fetch(`http://localhost:8080/api/events/${event.id}`, { // DELETE URL 확인
      method: 'DELETE',
    }).then(() => {
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
    });
  }
};

  return (
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      defaultView="month"
      views={['month']}
      style={{ width: 700, height: 500 }}
      step={15}
      timeslots={4}
      onSelectSlot={handleSelect}
      onSelectEvent={handleEventClick}
    />
  );
}

export default MyBigCalendar;
