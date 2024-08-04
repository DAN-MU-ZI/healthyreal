package com.healthyreal.be.api.controller.user;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.healthyreal.be.api.entity.Meal;
import com.healthyreal.be.api.entity.MealType;

public record MealUploadRequest(
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	LocalDate createdAt,
	MealType mealType,
	String title,
	String content
) {
	public Meal toEntity() {
		return new Meal(title, content, mealType, createdAt);
	}
}
