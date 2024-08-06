package com.healthyreal.be.api.controller.user;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthyreal.be.api.controller.user.dto.MealUploadRequest;
import com.healthyreal.be.api.controller.user.dto.UserResponse;
import com.healthyreal.be.api.entity.DailyMealDto;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest;
import com.healthyreal.be.api.service.MemberService;
import com.healthyreal.be.utils.CurrentUser;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
	private final MemberService memberService;

	@Operation(
		summary = "회원 정보 조회",
		description = "현재 로그인한 회원의 정보를 조회합니다."
	)
	@GetMapping
	public ResponseEntity<UserResponse> getUser(
		@Parameter(hidden = true) @CurrentUser Member user
	) {
		return ResponseEntity.ok(UserResponse.from(user));
	}

	@Operation(
		summary = "회원 등록",
		description = "새 회원을 등록합니다."
	)
	@PostMapping
	public ResponseEntity<String> registerMember(
		@RequestBody MemberRegisterRequest request,
		@Parameter(hidden = true) @CurrentUser Member user
	) {
		memberService.register(user, request);
		return ResponseEntity.ok("ok");
	}

	@Operation(
		summary = "식단 업로드",
		description = "현재 로그인한 회원의 식단을 업로드합니다.",
		requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
			content = @Content(
				mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
				schema = @Schema(implementation = MealUploadRequest.class)
			)
		)
	)
	@PostMapping(value = "/meal", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> uploadMeal(
		@Parameter(hidden = true) @CurrentUser Member user,
		@RequestPart(value = "data") MealUploadRequest request,
		@RequestPart(value = "image") MultipartFile image
	) {
		memberService.uploadMeal(user, request, image);
		return ResponseEntity.ok("ok");
	}

	@Operation(
		summary = "일일 식단 로그 조회",
		description = "주어진 날짜의 일일 식단 로그를 조회합니다."
	)
	@GetMapping("/dailyMealLog")
	public ResponseEntity<DailyMealDto> getDailyMealLog(
		@Parameter(hidden = true) @CurrentUser Member member,
		@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date
	) {
		return ResponseEntity.ok().body(memberService.getDailyMealLog(member, date));
	}
}
