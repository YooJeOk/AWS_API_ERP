package com.ERP.FinalProject.domain.MainPage.repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ERP.FinalProject.domain.MainPage.Entity.Calendar;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {
	 // 특정 날짜에 해당하는 이벤트 찾기
    List<Calendar> findByDate(LocalDate date);
}
