package com.healthyreal.be.api.repository.trainer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.user.Member;

@Repository
public interface TrainerInfoRepository extends JpaRepository<TrainerInfo, Long> {

	TrainerInfo findByUser(Member user);
}
