package com.healthyreal.be.api.repository.trainer;

import com.healthyreal.be.api.entity.trainer.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Long> {
}
