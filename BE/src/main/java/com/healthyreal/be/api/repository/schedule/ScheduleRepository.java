package com.healthyreal.be.api.repository.schedule;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthyreal.be.api.entity.schedule.Schedule;
import com.healthyreal.be.api.entity.user.Member;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

	@Query("SELECT s "
		+ "FROM Schedule s "
		+ "WHERE s.trainer = :trainer AND s.scheduleDate = :date AND s.lessonYn = 'Y'")
	List<Schedule> findSchedules(@Param("trainer") Member trainer, @Param("date") LocalDate date);
}
