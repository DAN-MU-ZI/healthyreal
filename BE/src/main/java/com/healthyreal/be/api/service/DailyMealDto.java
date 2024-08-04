package com.healthyreal.be.api.service;

import java.util.List;
import java.util.stream.Collectors;

import com.healthyreal.be.api.entity.Meal;
import com.healthyreal.be.api.entity.MealType;

public record DailyMealDto(List<MealDto> mealDtoList) {
	public record MealDto(MealType mealType, Long id, String title, Boolean hasReceivedFeedback) {
	}

	public static DailyMealDto of(List<Meal> dailyMealList) {
		return new DailyMealDto(dailyMealList.stream()
			.map(meal -> new MealDto(meal.getMealType(), meal.getId(), meal.getTitle(), null == meal.getComment()))
			.collect(Collectors.toList()));
	}
}
