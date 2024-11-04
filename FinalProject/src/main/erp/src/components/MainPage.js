import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomCalendar.css';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import SalesTable from '../components/SalesManagement/SalesTable';
import SalesStatusSalesTable from '../components/SalesManagement/SalesStatus/SalesStatusSalesTable';
import SalesDwmAnalysisTable from '../components/SalesManagement/SalesDwmAnalysis/SalesDwmAnalysisTable';

const localizer = momentLocalizer(moment);

function MyBigCalendar() {
  const [events, setEvents] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [eventDates, setEventDates] = useState({ start: null, end: null });
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 일정 추가 모달 열기
  const handleSelect = ({ start, end }) => {
    setEventDates({ start, end });
    setShowAddEventModal(true);
  };

  // 일정 삭제 모달 열기
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowDeleteEventModal(true);
  };

  // 일정 추가
  const handleAddEvent = () => {
    if (newEventTitle) {
      setEvents([...events, { start: eventDates.start, end: eventDates.end, title: newEventTitle }]);
      setNewEventTitle('');
      setShowAddEventModal(false);
    }
  };

  // 일정 삭제
  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e !== selectedEvent));
    setShowDeleteEventModal(false);
    setSelectedEvent(null);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowAddEventModal(false);
    setShowDeleteEventModal(false);
    setNewEventTitle('');
    setSelectedEvent(null);
  };

  return (
    <Container fluid className="custom-background" style={{ height: '100vh', padding: '0' }}>
      <Row style={{ height: '100%' }}>
        {/* 왼쪽 영역: 캘린더와 SalesTable을 위아래 50%로 배치 */}
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
            />
          </div>
          <div style={{ height: '50%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ color: '#703103', fontWeight: 'bold', fontSize: '25px',marginTop:'2%' }}>판매 기록 현황</h2>
            <SalesTable style={{ flex: '1', width: '100%', overflowY: 'auto' }}  maxItems={4} showpage={false} showTooltip={true}/>
          </div>
        </Col>

        {/* 오른쪽 영역: SalesStatusSalesTable과 ProductionPage9를 위아래 50%로 배치 */}
        <Col sm={6} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ color: '#703103', fontWeight: 'bold', fontSize: '25px',marginTop:'2%' }}>매출 현황</h2>
          <div style={{ height: '50%' }}>
            <SalesStatusSalesTable style={{ width: '100%', overflowY: 'auto' }} />
            <h2 style={{ color: '#703103', fontWeight: 'bold', fontSize: '25px',marginTop:'2%' }}>일/주/월 매출 현황</h2>
            <SalesDwmAnalysisTable style={{ width: '100%', overflowY: 'auto' }} showStats={false} />
          </div>
        </Col>
      </Row>

      {/* 일정 추가 모달 */}
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

      {/* 일정 삭제 확인 모달 */}
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
          <Button className="custom-hover-button" onClick={handleDeleteEvent}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MyBigCalendar;
