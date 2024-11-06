package com.ERP.FinalProject.domain.MainPage.Service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.MainPage.Entity.Calendar;
import com.ERP.FinalProject.domain.MainPage.repository.CalendarRepository;

import java.util.List;

@Service
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private static final Logger logger = LoggerFactory.getLogger(CalendarService.class);

    @Autowired
    public CalendarService(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    public List<Calendar> getAllEvents() {
        logger.info("Retrieving all events from the database");
        List<Calendar> events = calendarRepository.findAll();
        logger.info("Retrieved {} events from the database", events.size());
        return events;
    }

    public Calendar addEvent(Calendar event) {
        try {
            return calendarRepository.save(event);
        } catch (Exception e) {
            logger.error("Error saving event: {}", e.getMessage());
            throw e;
        }
    }

    public void deleteEvent(Long id) {
        try {
            calendarRepository.deleteById(id);
            logger.info("Deleted event with ID: {}", id);
        } catch (Exception e) {
            logger.error("Error deleting event with ID {}: {}", id, e.getMessage());
        }
    }}

