package com.healthyreal.be.api.controller.trainer;

import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.service.TrainerService;
import com.healthyreal.be.utils.CurrentUser;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/trainer")
@RequiredArgsConstructor
public class TrainerController {
	private final TrainerService trainerService;

	@PostMapping("/register")
	public ResponseEntity<String> registerTrainer(
		@CurrentUser Member user,
		@RequestPart("data") TrainerRequest request,
		@RequestPart("qualificationImages") List<MultipartFile> qualificationImages,
		@RequestPart("trainingProgramImages") List<MultipartFile> trainingProgramImages
	) {

		trainerService.register(user, request, qualificationImages, trainingProgramImages);

		return ResponseEntity.ok("ok");
	}
}
