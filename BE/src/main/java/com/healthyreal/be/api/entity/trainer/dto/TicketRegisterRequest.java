package com.healthyreal.be.api.entity.trainer.dto;

import java.time.LocalDate;

public record TicketRegisterRequest(
	String userId,
	String programName,
	Long totalCnt,
	LocalDate endPoint,
	String memo
) {
}
