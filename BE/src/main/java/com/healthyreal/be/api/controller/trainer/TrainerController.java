package com.healthyreal.be.api.controller.trainer;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthyreal.be.api.controller.trainer.dto.MealPlanResponse;
import com.healthyreal.be.api.controller.trainer.dto.ReviewMealRequest;
import com.healthyreal.be.api.controller.trainer.dto.SearchTrainerResponse;
import com.healthyreal.be.api.controller.trainer.dto.TrainerRequest;
import com.healthyreal.be.api.entity.trainer.dto.ProgramListResponse;
import com.healthyreal.be.api.entity.trainer.dto.TicketRegisterRequest;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMainPageResponse;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMemberDetailManagementResponse;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMemberManagementResponse;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMyPageResponse;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.GoalType;
import com.healthyreal.be.api.service.MemberService;
import com.healthyreal.be.api.service.TrainerService;
import com.healthyreal.be.utils.CurrentUser;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/trainer")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "트레이너 컨트롤러", description = "트레이너 관련 API를 제공하는 컨트롤러")
public class TrainerController {
	private final TrainerService trainerService;
	private final MemberService memberService;

	@Operation(
		summary = "트레이너 메인 페이지",
		description = "현재 로그인한 트레이너의 메인 페이지 정보를 조회합니다."
	)
	@GetMapping
	public ResponseEntity<TrainerMainPageResponse> mainTrainer(
		@CurrentUser Member user
	) {
		TrainerMainPageResponse mainPageByTrainer = trainerService.getMainPageByTrainer(user);
		return ResponseEntity.ok(mainPageByTrainer);
	}

	@Operation(
		summary = "트레이너 등록",
		description = "트레이너 정보를 등록합니다.",
		parameters = {
			@Parameter(name = "data", description = "트레이너 요청 데이터"),
			@Parameter(name = "qualificationImage", description = "자격증 이미지"),
			@Parameter(name = "trainingProgramImage", description = "훈련 프로그램 이미지")
		}
	)
	@PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> registerTrainer(
		@CurrentUser Member user,
		@RequestPart(value = "data") TrainerRequest request,
		@RequestPart(value = "qualificationImage") MultipartFile qualificationImage,
		@RequestPart(value = "trainingProgramImage") MultipartFile trainingProgramImage
	) {
		trainerService.register(user, request, qualificationImage, trainingProgramImage);
		return ResponseEntity.ok("ok");
	}

	@Operation(
		summary = "트레이너 마이 페이지",
		description = "현재 로그인한 트레이너의 마이 페이지 정보를 조회합니다."
	)
	@GetMapping("/mypage")
	public ResponseEntity<TrainerMyPageResponse> myPageTrainer(
		@CurrentUser Member user
	) {
		TrainerMyPageResponse trainerMyPageResponse = trainerService.readTrainerMyPage(user);
		return ResponseEntity.ok(trainerMyPageResponse);
	}

	@Operation(
		summary = "트레이너 검색",
		description = "트레이너를 검색합니다.",
		parameters = {
			@Parameter(name = "keyWord", description = "검색 키워드"),
			@Parameter(name = "category", description = "카테고리"),
			@Parameter(name = "location", description = "위치")
		}
	)
	@GetMapping("/search")
	public ResponseEntity<SearchTrainerResponse> searchTrainers(
		@RequestParam(name = "keyWord", required = false) String keyWord,
		@RequestParam(name = "category", required = false) GoalType category,
		@RequestParam(name = "location", required = false) String location
	) {
		SearchTrainerResponse response = trainerService.searchTrainers(keyWord, category, location, null, null);
		return ResponseEntity.ok().body(response);
	}

	@Operation(
		summary = "회원 관리",
		description = "현재 로그인한 트레이너의 회원 관리를 조회합니다."
	)
	@GetMapping("/members")
	public ResponseEntity<TrainerMemberManagementResponse> memberManagementTrainer(
		@CurrentUser Member user
	) {
		TrainerMemberManagementResponse response = trainerService.readTrainerMembers(user);
		return ResponseEntity.ok(response);
	}

	@Operation(
		summary = "회원 상세 관리",
		description = "현재 로그인한 트레이너의 회원 상세 정보를 조회합니다.",
		parameters = {
			@Parameter(name = "userId", description = "회원 아이디")
		}
	)
	@GetMapping("/members/detail")
	public ResponseEntity<TrainerMemberDetailManagementResponse> memberDetailManagementTrainer(
		@CurrentUser Member user,
		@RequestParam(required = false) String userId
	) {
		try {
			TrainerMemberDetailManagementResponse response = trainerService.readTrainerMembersDetail(
				user, userId);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(400).body(null);
		}
	}

	@Operation(
		summary = "회원 확인",
		description = "회원 아이디로 회원 이름을 확인합니다.",
		parameters = {
			@Parameter(name = "userId", description = "회원 아이디")
		}
	)
	@GetMapping("/checkmember")
	public ResponseEntity<String> checkMember(
		@RequestParam(name = "userId", required = false) String userId
	) {
		String memberName = trainerService.checkMember(userId);
		if (memberName == null)
			return new ResponseEntity<>("존재하지 않는 아이디 입니다.", HttpStatus.BAD_REQUEST);
		return ResponseEntity.ok(memberName);
	}

	@Operation(
		summary = "티켓 등록 페이지",
		description = "트레이너의 티켓 등록 페이지 정보를 조회합니다."
	)
	@GetMapping("/ticket/register")
	public ResponseEntity<ProgramListResponse> registerTicketPage(
		@CurrentUser Member trainer
	) {
		ProgramListResponse response = trainerService.getProgramList(trainer);
		return ResponseEntity.ok(response);
	}

	@Operation(
		summary = "티켓 등록",
		description = "트레이너가 새로운 티켓을 등록합니다.",
		parameters = {
			@Parameter(name = "request", description = "티켓 등록 요청 데이터")
		}
	)
	@PostMapping("/ticket/register")
	public ResponseEntity<String> registerTicket(
		@CurrentUser Member trainer,
		@RequestBody TicketRegisterRequest request
	) {
		trainerService.registerTicket(trainer, request);
		return ResponseEntity.ok("ok");
	}

	@Operation(
		summary = "식단 리뷰",
		description = "트레이너가 회원의 식단을 리뷰합니다.",
		parameters = {
			@Parameter(name = "request", description = "식단 리뷰 요청 데이터")
		}
	)
	@PostMapping("/meal/review")
	public ResponseEntity<String> reviewMeal(
		@CurrentUser Member trainer,
		@RequestBody ReviewMealRequest request
	) {
		memberService.reviewMeal(trainer, request);
		return ResponseEntity.ok("ok");
	}

	@Operation(
		summary = "식단 계획 조회",
		description = "식단 ID로 식단 계획을 조회합니다.",
		parameters = {
			@Parameter(name = "mealId", description = "식단 ID")
		}
	)
	@GetMapping("/meal/review/{id}")
	public ResponseEntity<MealPlanResponse> getMealPlan(
		@PathVariable("id") Long mealId
	) {
		MealPlanResponse response = memberService.getMealById(mealId);
		return ResponseEntity.ok().body(response);
	}
}
