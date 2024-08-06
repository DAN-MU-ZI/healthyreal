package com.healthyreal.be.api.controller.user;

import com.healthyreal.be.api.entity.Meal;

public record MealDto(
	Long id,
	String title,
	String content,
	String imageUrl
) {
	public static MealDto of(Meal meal) {
		return new MealDto(meal.getId(), meal.getTitle(), meal.getContent(), meal.getImage().getUrl());
	}
}
