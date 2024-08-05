package com.healthyreal.be.api.controller.trainer.dto;

import java.time.LocalDate;

import com.healthyreal.be.api.entity.Meal;
import com.healthyreal.be.api.entity.MealType;
import com.healthyreal.be.api.entity.community.Comment;

public record MealPlanResponse(
	MealType mealType,
	String title,
	CommentDto o,
	LocalDate date) {
	public static MealPlanResponse of(Meal meal) {
		return new MealPlanResponse(meal.getMealType(), meal.getTitle(), CommentDto.of(meal.getComment()),
			meal.getDate());
	}

	public record CommentDto(
		String profileImageUrl,
		String username,
		String content
	) {

		public static CommentDto of(Comment comment) {
			return new CommentDto(
				comment.getMember().getProfileImageUrl(),
				comment.getMember().getUsername(),
				comment.getContent());
		}
	}
}
