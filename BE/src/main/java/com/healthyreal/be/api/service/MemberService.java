package com.healthyreal.be.api.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.healthyreal.be.api.controller.user.MealUploadRequest;
import com.healthyreal.be.api.entity.Meal;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.BodyInfo;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.Gym;
import com.healthyreal.be.api.entity.userInfo.UserInfo;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest;
import com.healthyreal.be.api.repository.MealRepository;
import com.healthyreal.be.api.repository.userInfo.UserInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final UserInfoRepository userInfoRepository;
	private final MealRepository mealRepository;

	public void register(final Member user, final MemberRegisterRequest request) {
		List<Goal> goals = request.goalTypesToEntity();
		BodyInfo bodyInfo = request.bodyInfoDto().toEntity();
		Gym gym = request.gymDto().toEntity();

		UserInfo userInfo = new UserInfo(user, goals, request.gender(), bodyInfo, gym, request.exerciseLevel(),
			request.agreeToReceive(), request.bodyInfoDto().birthDate());

		userInfoRepository.save(userInfo);
	}

	public void uploadMeal(Member user, MealUploadRequest request, MultipartFile image) {
		Meal meal = request.toEntity();
		meal.setMember(user);

		mealRepository.save(meal);
	}

	public DailyMealDto getDailyMealLog(Member user, LocalDate date) {
		return DailyMealDto.of(mealRepository.findMealsByDateAndMember(date, user));
	}
}
