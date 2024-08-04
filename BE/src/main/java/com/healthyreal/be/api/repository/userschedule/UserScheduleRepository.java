package com.healthyreal.be.api.repository.userschedule;

import com.healthyreal.be.api.entity.userschedule.UserSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserScheduleRepository extends JpaRepository<UserSchedule, Long> {
	List<UserSchedule> findByUserId(Long userId);
}
