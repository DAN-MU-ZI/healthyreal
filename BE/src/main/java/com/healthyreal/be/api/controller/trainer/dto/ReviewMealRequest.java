package com.healthyreal.be.api.controller.trainer.dto;

public record ReviewMealRequest(
	Long mealID,
	String content
) {
}
