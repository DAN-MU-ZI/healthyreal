package com.healthyreal.be.api.repository.trainer;

import com.healthyreal.be.api.entity.trainer.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> {
}
