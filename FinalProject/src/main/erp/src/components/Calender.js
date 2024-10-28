import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomCalendar.css';

const localizer = momentLocalizer(moment);

function MyBigCalendar() {
  const [events, setEvents] = useState([]);

  // 날짜 선택 시 새로운 일정 추가
  const handleSelect = ({ start, end }) => {
    const title = window.prompt('새 일정 제목:');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  // 이벤트 클릭 시 일정 제거
  const handleEventClick = (event) => {
    if (window.confirm(`"${event.title}" 일정을 삭제하시겠습니까?`)) {
      setEvents(events.filter((e) => e !== event));
    }
  };

  return (
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      defaultView="month"
      views={['month']} // 주간/하루 삭제
      style={{ width: 700, height: 500 }}
      step={15} // 15분 단위로 시간 선택 가능
      timeslots={4} // 각 시간대마다 4개 슬롯 (15분 간격으로 설정됨)
      onSelectSlot={handleSelect} // 일정 추가 기능
      onSelectEvent={handleEventClick} // 일정 삭제 기능
    />
  );
}

export default MyBigCalendar;