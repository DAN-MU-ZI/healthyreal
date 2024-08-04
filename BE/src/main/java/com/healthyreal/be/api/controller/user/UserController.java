package com.healthyreal.be.api.controller.user;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest;
import com.healthyreal.be.api.service.CommunityService;
import com.healthyreal.be.api.service.MemberService;
import com.healthyreal.be.utils.CurrentUser;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
	private final MemberService memberService;
	private final CommunityService communityService;

	@GetMapping
	public ResponseEntity<UserResponse> getUser(@CurrentUser Member user) {
		return ResponseEntity.ok(UserResponse.from(user));
	}

	@PostMapping
	public ResponseEntity<String> registerMember(@RequestBody MemberRegisterRequest request,
		@CurrentUser Member user) {

		memberService.register(user, request);

		return ResponseEntity.ok("ok");
	}

	@PostMapping(value = "/meal", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> uploadMeal(
		@CurrentUser Member user,
		@RequestPart(value = "data") MealUploadRequest request,
		@RequestPart(value = "image") MultipartFile image
	) {

		memberService.uploadMeal(user, request, image);

		return ResponseEntity.ok("ok");
	}
}
