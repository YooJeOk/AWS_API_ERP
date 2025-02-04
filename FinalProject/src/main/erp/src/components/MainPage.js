import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomCalendar.css';
import SalesTable from '../components/SalesManagement/SalesTable';
import SalesStatusSalesTable from '../components/SalesManagement/SalesStatus/SalesStatusSalesTable';
import SalesDwmAnalysisTable from '../components/SalesManagement/SalesDwmAnalysis/SalesDwmAnalysisTable';

const localizer = momentLocalizer(moment);

function MyBigCalendar() {
  const [events, setEvents] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const [showEventListModal, setShowEventListModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [eventDates, setEventDates] = useState({ start: null, end: null });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((event) => ({
          ...event,
          start: new Date(event.date),
          end: new Date(event.date),
        }));
        setEvents(formattedData);
      });
  }, []);

  const handleSelect = ({ start, end }) => {
    setEventDates({ start, end });
    setShowAddEventModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowDeleteEventModal(true);
  };

  const handleAddEvent = () => {
    if (newEventTitle) {
      const adjustedStartDate = new Date(eventDates.start);
      adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);
  
      const newEvent = { date: adjustedStartDate, title: newEventTitle };
      fetch('http://localhost:8080/api/add', {
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
          setNewEventTitle('');
          setShowAddEventModal(false);
        });
    }
  };

  const handleDeleteEvent = (eventId) => {
    fetch(`http://localhost:8080/api/events/${eventId}`, {
      method: 'DELETE',
    }).then(() => {
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId));
      setShowDeleteEventModal(false);
      setShowEventListModal(false);
      setSelectedEvent(null);
    });
  };

  const handleMoreEventsClick = (date) => {
    const dateEvents = events.filter((event) => moment(event.start).isSame(date, 'day'));
    setSelectedDateEvents(dateEvents);
    setShowEventListModal(true);
  };

  const closeModal = () => {
    setShowAddEventModal(false);
    setShowDeleteEventModal(false);
    setShowEventListModal(false);
    setNewEventTitle('');
    setSelectedEvent(null);
  };

  const renderEvent = ({ event }) => {
    const dateEvents = events.filter((evt) => moment(evt.start).isSame(event.start, 'day'));
  
    if (dateEvents.indexOf(event) === 1) {
      return null;
    }
  
    return (
      <div
        className="event-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F0C490',
        }}
      >
        <span style={{ fontWeight: 'bold', textDecoration: 'none', color: '#703103' }}>
          {event.title}
        </span>
        {dateEvents.length > 1 && (
          <Button
            variant="link"
            style={{ padding: 0, fontSize: '14px', marginLeft: 'auto', color: '#703103', fontWeight: 'bold' }}
            onClick={() => handleMoreEventsClick(event.start)}
          >
            +{dateEvents.length - 1} more
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <Container fluid className="custom-background" style={{ height: '100vh', padding: '0' }}>
      <Row style={{ height: '100%' }}>
        <Col sm={6} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '50%' }}>
            <Calendar
              selectable
              localizer={localizer}
              events={events}
              defaultView="month"
              views={['month']}
              style={{ width: '100%', height: '100%' }}
              step={15}
              timeslots={4}
              onSelectSlot={handleSelect}
              onSelectEvent={handleEventClick}
              components={{
                event: renderEvent,
              }}
            />
          </div>
          <div style={{ height: '50%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ color: '#703103', fontWeight: 'bold', fontSize: '25px', marginTop: '2%' }}>판매 기록 현황</h2>
            <SalesTable style={{ flex: '1', width: '100%', overflowY: 'auto' }} maxItems={4} showpage={false} showTooltip={true} />
          </div>
        </Col>
        <Col sm={6} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ color: '#703103', fontWeight: 'bold', fontSize: '25px', marginTop: '2%' }}>매출 현황</h2>
          <div style={{ height: '50%' }}>
            <SalesStatusSalesTable showpage={false} style={{ width: '100%', overflowY: 'auto' }} />
            <h2 style={{ color: '#703103', fontWeight: 'bold', fontSize: '25px', marginTop: '2%' }}>일/주/월 매출 현황</h2>
            <SalesDwmAnalysisTable style={{ width: '100%', overflowY: 'auto' }} showStats={false} />
          </div>
        </Col>
      </Row>

      <Modal show={showAddEventModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>새 일정 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>일정 제목을 입력하세요:</Form.Label>
              <Form.Control
                type="text"
                placeholder="일정 제목"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button className="custom-hover-button" onClick={closeModal}>
            취소
          </Button>
          <Button className="custom-hover-button" onClick={handleAddEvent}>
            추가
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteEventModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>일정 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: '1.1em', color: '#333' }}>
            "{selectedEvent?.title}" 일정을 삭제하시겠습니까?
          </p>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button className="custom-hover-button" onClick={closeModal}>
            취소
          </Button>
          <Button className="custom-hover-button" onClick={() => handleDeleteEvent(selectedEvent?.id)}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEventListModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>전체 일정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDateEvents.map((evt) => (
            <div key={evt.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>{evt.title}</span>
              <Button className="custom-hover-button" onClick={() => handleDeleteEvent(evt.id)}>
                삭제
              </Button>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-hover-button" onClick={closeModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MyBigCalendar;
