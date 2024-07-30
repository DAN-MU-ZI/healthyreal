package com.healthyreal.be.api.repository.userInfo;

import com.healthyreal.be.api.entity.userInfo.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
}
