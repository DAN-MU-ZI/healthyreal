package com.healthyreal.be.api.controller.user;

import com.healthyreal.be.api.entity.user.User;
import com.healthyreal.be.api.entity.user.dto.MemberRegisterRequest;
import com.healthyreal.be.api.service.UserService;
import com.healthyreal.be.utils.CurrentUser;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;

	@GetMapping
	public ResponseEntity<UserResponse> getUser(@CurrentUser User user) {
		return ResponseEntity.ok(new UserResponse(user));
	}

	@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<String> handleOnboarding(
		@RequestPart("file") MultipartFile file,
		@RequestPart("data") MemberRegisterRequest data) {
		try {
			// 파일 저장 로직
			byte[] bytes = file.getBytes();
			Path path = Paths.get(Paths.get("D:/project") + "/uploads/" + file.getOriginalFilename());
			Files.write(path, bytes);

			// JSON 데이터 처리 로직
			System.out.println("Received data: " + data);

			// 응답 반환
			return new ResponseEntity<>("File and data received successfully!", HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>("Failed to receive file and data.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
