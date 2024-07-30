package com.healthyreal.be.api.repository.userInfo;

import static org.assertj.core.api.Assertions.assertThat;

import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.BodyInfo;
import com.healthyreal.be.api.entity.userInfo.ExerciseLevel;
import com.healthyreal.be.api.entity.userInfo.Gender;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.GoalType;
import com.healthyreal.be.api.entity.userInfo.Gym;
import com.healthyreal.be.api.entity.userInfo.UserInfo;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest.BodyInfoDto;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest.GymDto;
import com.healthyreal.be.api.repository.user.UserRepository;
import com.healthyreal.be.oauth.entity.ProviderType;
import com.healthyreal.be.oauth.entity.RoleType;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class UserInfoRepositoryTest {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserInfoRepository userInfoRepository;
	@Autowired
	private GoalRepository goalRepository;
	@Autowired
	private GymRepository gymRepository;
	@Autowired
	private BodyInfoRepository bodyInfoRepository;

	@Test
	void saveUserInfo() {
		Member user = new Member(
			"hello",
			"Test User",
			"testuser@example.com",
			"Y",
			"",
			ProviderType.KAKAO,
			RoleType.USER,
			LocalDateTime.now(),
			LocalDateTime.now()
		);
		userRepository.saveAndFlush(user);

		// BodyInfo 객체 생성
		BodyInfoDto bodyInfoDto = new BodyInfoDto(LocalDate.of(1990, 1, 1), 180.0, 75.0);

		// Gym 객체 생성
		GymDto gymDto = new GymDto("My Gym", "123 Fitness St.");

		// MemberRegisterRequest 객체 생성
		MemberRegisterRequest request = new MemberRegisterRequest(
			Arrays.asList(GoalType.WEIGHT_LOSS, GoalType.MUSCLE_GAIN),
			Gender.MALE,
			bodyInfoDto,
			gymDto,
			ExerciseLevel.BEGINNER,
			true);

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

		assertThat(userRepository.findAll().size()).isEqualTo(1);
		assertThat(goalRepository.findAll().size()).isEqualTo(goals.size());
		assertThat(gymRepository.findAll().size()).isEqualTo(1);
		assertThat(bodyInfoRepository.findAll().size()).isEqualTo(1);
		assertThat(userInfoRepository.findAll().size()).isEqualTo(1);
	}
}