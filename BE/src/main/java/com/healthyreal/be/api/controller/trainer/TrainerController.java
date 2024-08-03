package com.healthyreal.be.api.controller.trainer;

import com.healthyreal.be.api.entity.trainer.dto.TrainerMainPageResponse;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMemberManagementResponse;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.GoalType;
import com.healthyreal.be.api.service.TrainerService;
import com.healthyreal.be.utils.CurrentUser;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.healthyreal.be.api.entity.trainer.dto.TrainerMyPageResponse;

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

	@PostMapping("/register")
	public ResponseEntity<String> registerTrainer(
		@CurrentUser Member user,
		@RequestPart(value = "data", required = true) TrainerRequest request,
		@RequestPart(value = "qualificationImages", required = true) List<MultipartFile> qualificationImages,
		@RequestPart(value = "trainingProgramImages", required = true) List<MultipartFile> trainingProgramImages
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
    public ResponseEntity<SearchTrainerResponse> searchTrainers(@RequestParam(required = false) String keyWord,
        @RequestParam(required = false) GoalType category,
        @RequestParam(required = false) String location) {
        SearchTrainerResponse response = trainerService.searchTrainers(keyWord, category, location, null, null);
        return ResponseEntity.ok().body(response);
    }
	@GetMapping("/members")
	public ResponseEntity<TrainerMemberManagementResponse> memberManagementTrainer(
		@CurrentUser Member user
	){
		TrainerMemberManagementResponse trainerMemberManagementResponse = trainerService.readTrainerMembers(user);
		return ResponseEntity.ok(trainerMemberManagementResponse);
	}
}
