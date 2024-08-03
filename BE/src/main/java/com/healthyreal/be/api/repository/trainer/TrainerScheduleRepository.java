package com.healthyreal.be.api.repository.trainer;

import com.healthyreal.be.api.entity.trainer.TrainerSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerScheduleRepository extends JpaRepository<TrainerSchedule, Long> {
}
