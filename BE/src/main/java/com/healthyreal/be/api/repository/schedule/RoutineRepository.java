package com.healthyreal.be.api.repository.schedule;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthyreal.be.api.entity.schedule.Routine;
import com.healthyreal.be.api.entity.schedule.Schedule;

public interface RoutineRepository extends JpaRepository<Routine, Long> {

	List<Routine> findBySchedule(Schedule schedule);
}
