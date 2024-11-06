package com.ERP.FinalProject.domain.MainPage.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.MainPage.Entity.Calendar;
import com.ERP.FinalProject.domain.MainPage.Service.CalendarService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CalendarController {

    private final CalendarService calendarService;
    private static final Logger logger = LoggerFactory.getLogger(CalendarController.class);

    @Autowired
    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    // 모든 일정 조회
    @GetMapping("/events")
    public List<Calendar> getAllEvents() {
        logger.info("Fetching all events");
        List<Calendar> events = calendarService.getAllEvents();
        logger.info("Found {} events", events.size());
        return events;
    }

    // 일정 추가
    @PostMapping("/add")
    public Calendar addEvent(@RequestBody Calendar event) {
        logger.info("Adding event with title: {}", event.getTitle());
        Calendar savedEvent = calendarService.addEvent(event);
        logger.info("Event saved with ID: {}", savedEvent.getId());
        return savedEvent;
    }

    // 일정 삭제
    @DeleteMapping("/events/{id}")
    public void deleteEvent(@PathVariable Long id) {
        logger.info("Deleting event with ID: {}", id);
        calendarService.deleteEvent(id);
        logger.info("Event with ID {} deleted", id);
    }
}

