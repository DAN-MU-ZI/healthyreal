package com.healthyreal.be.api.entity.user.dto;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.healthyreal.be.api.entity.userInfo.ExerciseLevel;
import com.healthyreal.be.api.entity.userInfo.Gender;
import com.healthyreal.be.api.entity.userInfo.GoalType;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest.BodyInfoDto;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest.GymDto;
import java.time.LocalDate;
import java.util.Arrays;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MemberRegisterRequestTest {

	@DisplayName("트레이너 회원가입 요청 데이터 생성 테스트")
	@Test
	void createRequest() throws JsonProcessingException {
		// Gym 객체 생성
		GymDto gym = new GymDto("My Gym", "123 Fitness St.");

		// BodyInfo 객체 생성
		BodyInfoDto bodyInfo = new BodyInfoDto(LocalDate.of(1990, 1, 1), 180.0, 75.0);

		// MemberRegisterRequest 객체 생성
		MemberRegisterRequest request = new MemberRegisterRequest(
			Arrays.asList(GoalType.WEIGHT_LOSS, GoalType.MUSCLE_GAIN),
			Gender.MALE,
			bodyInfo,
			gym,
			ExerciseLevel.BEGINNER,
			true);

		// JSON으로 직렬화
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());
		String json = objectMapper.writeValueAsString(request);

		// 결과 확인
		assertNotNull(request);
		System.out.println(json);  // JSON 출력
	}
}