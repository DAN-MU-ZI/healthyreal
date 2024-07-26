package com.healthyreal.be.api.controller.user;

import com.healthyreal.be.api.entity.user.User;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest;
import com.healthyreal.be.api.service.MemberService;
import com.healthyreal.be.utils.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
	private final MemberService memberService;

	@GetMapping
	public ResponseEntity<UserResponse> getUser(@CurrentUser User user) {
		return ResponseEntity.ok(new UserResponse(user));
	}

	@PostMapping
	public ResponseEntity<String> registerMember(
		@RequestBody MemberRegisterRequest request,
		@CurrentUser User user) {

		memberService.register(user, request);

		return ResponseEntity.ok("ok");
	}
}
