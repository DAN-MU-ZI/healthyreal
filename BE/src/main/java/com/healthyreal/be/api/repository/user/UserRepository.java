package com.healthyreal.be.api.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.user.Member;

@Repository
public interface UserRepository extends JpaRepository<Member, Long> {
	Member findByUserId(String userId);

	Member findByTrainerInfo(TrainerInfo trainerInfo);

	boolean existsByUserId(String userId);
	
}

