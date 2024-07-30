package com.healthyreal.be.api.repository.userInfo;

import com.healthyreal.be.api.entity.userInfo.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
}
