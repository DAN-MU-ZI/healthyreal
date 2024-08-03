package com.healthyreal.be.api.controller.user;

import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.dto.MemberRegisterRequest;
import com.healthyreal.be.api.service.CommunityService;
import com.healthyreal.be.api.service.MemberService;
import com.healthyreal.be.utils.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
