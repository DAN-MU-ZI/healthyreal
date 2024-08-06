package com.healthyreal.be.api.entity.trainer.dto;

import java.util.List;

import com.healthyreal.be.api.entity.Meal;

public record TrainerMemberMealsResponse(
	Long memberSeq,
	String memberName,
	String mealTitle,
	String mealType,
	String isComment
) {
	public static List<TrainerMemberMealsResponse> toResponse(List<Meal> mealList) {
		return mealList.stream()
			.map(meal -> new TrainerMemberMealsResponse(
				meal.getMember().getUserSeq(),
				meal.getMember().getUsername(),
				meal.getTitle(),
				meal.getMealType().toString(),
				meal.getComment() == null ? "미작성" : "작성완료"
			)).toList();
	}
}
