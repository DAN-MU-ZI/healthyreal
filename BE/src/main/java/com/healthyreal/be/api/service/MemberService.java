package com.healthyreal.be.api.service;

import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.BodyInfo;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.Gym;
import com.healthyreal.be.api.entity.userInfo.UserInfo;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest;
import com.healthyreal.be.api.repository.userInfo.UserInfoRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final UserInfoRepository userInfoRepository;

	public void register(final Member user, final MemberRegisterRequest request) {
		List<Goal> goals = request.goalTypesToEntity();
		BodyInfo bodyInfo = request.bodyInfoDto().toEntity();
		Gym gym = request.gymDto().toEntity();

		UserInfo userInfo = new UserInfo(user,
			goals,
			request.gender(),
			bodyInfo,
			gym,
			request.exerciseLevel(),
			request.agreeToReceive());

		userInfoRepository.save(userInfo);
	}
}
