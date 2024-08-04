package com.healthyreal.be.api.controller.trainer;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthyreal.be.api.entity.trainer.dto.TrainerMainPageResponse;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMemberDetailManagementResponse;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMyPageResponse;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.GoalType;
import com.healthyreal.be.api.service.TrainerService;
import com.healthyreal.be.utils.CurrentUser;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/trainer")
@RequiredArgsConstructor
public class TrainerController {
	private final TrainerService trainerService;

	@GetMapping
	public ResponseEntity<TrainerMainPageResponse> mainTrainer(
		@CurrentUser Member user
	) {
		TrainerMainPageResponse mainPageByTrainer = trainerService.getMainPageByTrainer(user);
		return ResponseEntity.ok(mainPageByTrainer);
	}

	@PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> registerTrainer(
		@CurrentUser Member user,
		@RequestPart(value = "data") TrainerRequest request,
		@RequestPart(value = "qualificationImages") List<MultipartFile> qualificationImages,
		@RequestPart(value = "trainingProgramImages") List<MultipartFile> trainingProgramImages
	) {

		trainerService.register(user, request, qualificationImages, trainingProgramImages);

		return ResponseEntity.ok("ok");
	}

	@GetMapping("/mypage")
	public ResponseEntity<TrainerMyPageResponse> myPageTrainer(
		@CurrentUser Member user
	) {
		TrainerMyPageResponse trainerMyPageResponse = trainerService.readTrainerMyPage(user);
		return ResponseEntity.ok(trainerMyPageResponse);
	}

	@GetMapping("/search")
	public ResponseEntity<SearchTrainerResponse> searchTrainers(
		@RequestParam(name = "keyWord", required = false) String keyWord,
		@RequestParam(name = "category", required = false) GoalType category,
		@RequestParam(name = "location", required = false) String location) {
		SearchTrainerResponse response = trainerService.searchTrainers(keyWord, category, location, null, null);
		return ResponseEntity.ok().body(response);
	}

	@GetMapping("/members/detail")
	public ResponseEntity<Object> memberDetailManagementTrainer(
		@CurrentUser Member user,
		@RequestParam(required = false) String userId
	) {
		try {
			TrainerMemberDetailManagementResponse response = trainerService.readTrainerMembersDetail(
				user, userId);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(400).body(e.getMessage());
		}
	}
}
