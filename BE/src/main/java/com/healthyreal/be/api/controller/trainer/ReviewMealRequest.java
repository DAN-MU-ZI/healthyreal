package com.healthyreal.be.api.controller.trainer;

public record ReviewMealRequest(
	Long mealID,
	String content
) {
}
