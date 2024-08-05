package com.healthyreal.be.api.repository.trainer;

import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.GoalType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerInfoRepository extends JpaRepository<TrainerInfo, Long> {

	TrainerInfo findByUser(Member user);

	@Query("select distinct t from TrainerInfo t " + "left join t.goalList c " + "where (:keyWord is null or t.user.username like %:keyWord% or t.profileDescription like %:keyWord%) " + "and (:category is null or c.goalType = :category) " + "and (:location is null or t.gym.address like %:location%)")
	Page<TrainerInfo> findAllByFilters(@Param("keyWord") String keyWord, @Param("category") GoalType category,
		@Param("location") String location, Pageable pageable);

}
