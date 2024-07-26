package com.healthyreal.be.api.repository.userInfo;

import com.healthyreal.be.api.entity.userInfo.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymRepository extends JpaRepository<Gym, Long> {
}
