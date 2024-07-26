package com.healthyreal.be.api.service;

import com.healthyreal.be.api.entity.user.User;
import com.healthyreal.be.api.entity.userInfo.BodyInfo;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.Gym;
import com.healthyreal.be.api.entity.userInfo.UserInfo;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest;
import com.healthyreal.be.api.repository.userInfo.BodyInfoRepository;
import com.healthyreal.be.api.repository.userInfo.GoalRepository;
import com.healthyreal.be.api.repository.userInfo.GymRepository;
import com.healthyreal.be.api.repository.userInfo.UserInfoRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final BodyInfoRepository bodyInfoRepository;
	private final GymRepository gymRepository;
	private final GoalRepository goalRepository;
	private final UserInfoRepository userInfoRepository;

	public void register(final User user, final MemberRegisterRequest request) {
		BodyInfo bodyInfo = request.bodyInfoDto().toEntity();
		bodyInfoRepository.save(bodyInfo);
		Gym gym = request.gymDto().toEntity();
		gymRepository.save(gym);
		List<Goal> goals = request.goalTypesToEntity();
		goalRepository.saveAll(goals);

		UserInfo userInfo = new UserInfo(user, request.gender(), request.exerciseLevel(), goals, bodyInfo, gym);
		userInfoRepository.save(userInfo);
	}
}
