package com.healthyreal.be.api.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.healthyreal.be.api.controller.trainer.SearchTrainerResponse;
import com.healthyreal.be.api.controller.trainer.TrainerRequest;
import com.healthyreal.be.api.entity.Meal;
import com.healthyreal.be.api.entity.Ticket;
import com.healthyreal.be.api.entity.schedule.Schedule;
import com.healthyreal.be.api.entity.trainer.Qualification;
import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.trainer.TrainerSchedule;
import com.healthyreal.be.api.entity.trainer.TrainingProgram;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMainPageResponse;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMemberDetailManagementResponse;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMemberManagementResponse;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMyPageResponse;
import com.healthyreal.be.api.entity.user.Gender;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.GoalType;
import com.healthyreal.be.api.entity.userInfo.Gym;
import com.healthyreal.be.api.repository.MealRepository;
import com.healthyreal.be.api.repository.TicketRepository;
import com.healthyreal.be.api.repository.schedule.ScheduleRepository;
import com.healthyreal.be.api.repository.trainer.TrainerInfoRepository;
import com.healthyreal.be.api.repository.user.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TrainerService {
	private final TrainerInfoRepository trainerInfoRepository;
	private final S3Service s3Service;
	private final ScheduleRepository scheduleRepository;
	private final MealRepository mealRepository;
	private final TicketRepository ticketRepository;
	private final UserRepository userRepository;

	public void register(
		final Member user,
		final TrainerRequest request,
		final List<MultipartFile> qualificationImages,
		final List<MultipartFile> trainingProgramImages
	) {
		Gym gym = request.gymDto().toEntity();
		List<Goal> goals = request.goalTypesToEntity();
		List<Qualification> qualifications = request.qualificationDtoListToEntity();
		TrainingProgram trainingProgram = request.trainingProgramDto().toEntity();
		List<TrainerSchedule> trainerSchedules = request.scheduleDtoListToEntity();
		String profileDescription = request.profileDescription();

		validateImageCounts(qualifications, trainingProgram, qualificationImages, trainingProgramImages);

		//		try {
		//			List<S3Image> s3Images = s3Service.saveImages(qualificationImages, "trainer/qualification");
		//			Iterator<S3Image> imageIterator = s3Images.iterator();
		//
		//			qualifications.forEach(qualification -> {
		//				if (imageIterator.hasNext()) {
		//					qualification.setImage(imageIterator.next());
		//				}
		//			});
		//			List<S3Image> trainingProgramImagesList = s3Service.saveImages(trainingProgramImages,
		//				"trainer/trainingProgram");
		//			trainingProgram.addAllImage(trainingProgramImagesList);
		//		} catch (Exception e) {
		//			// 예외를 무시하고 계속 진행합니다.
		//			e.printStackTrace(); // 로그를 남깁니다.
		//		}

		TrainerInfo trainerInfo = createTrainerInfo(user, gym, goals, qualifications, trainingProgram, trainerSchedules,
			profileDescription, null);

		// Save trainerInfo without transactional rollback
		saveTrainerInfoWithoutRollback(trainerInfo);
	}

	@Transactional(dontRollbackOn = Exception.class)
	public void saveTrainerInfoWithoutRollback(TrainerInfo trainerInfo) {
		trainerInfoRepository.save(trainerInfo);
	}

	private void validateImageCounts(
		final List<Qualification> qualifications,
		final TrainingProgram trainingProgram,
		final List<MultipartFile> qualificationImages,
		final List<MultipartFile> trainingProgramImages
	) {
		if (qualifications.size() != qualificationImages.size()) {
			throw new IllegalArgumentException(
				"The number of qualifications must match the number of qualification images.");
		}

		if (qualificationImages.size() != trainingProgramImages.size()) {
			throw new IllegalArgumentException(
				"The number of qualification images must match the number of training program images.");
		}

		if (trainingProgramImages.isEmpty() && trainingProgram == null) {
			throw new IllegalArgumentException("No training program images provided.");
		}
	}

	private TrainerInfo createTrainerInfo(
		final Member user,
		final Gym gym,
		final List<Goal> goals,
		final List<Qualification> qualifications,
		final TrainingProgram trainingProgram,
		final List<TrainerSchedule> trainerSchedules,
		final String profileDescription,
		final Gender gender
	) {
		return new TrainerInfo(user, gym, goals, qualifications, trainingProgram, trainerSchedules, profileDescription,
			gender);
	}

	public TrainerMainPageResponse getMainPageByTrainer(Member user) {
		//식단 3개
		List<Meal> meals = mealRepository.findMealsWithoutComment(user, LocalDate.now()).stream().limit(3).toList();

		//일정 3개
		List<Schedule> schedules = scheduleRepository.findSchedules(user, LocalDate.now()).stream().limit(3).toList();

		//회원 3개
		List<Ticket> tickets = ticketRepository.findAllByTrainer(user).stream().limit(3).toList();

		log.info("tickets.size() = " + tickets.size());

		for (Ticket ticket : tickets) {
			log.info("ticket.getTrainer().getUsername() = " + ticket.getTrainer().getUsername());
			log.info("ticket.getTrainingProgram().getTitle() = " + ticket.getTrainingProgram().getTitle());
		}

		return TrainerMainPageResponse.toResponse(schedules, meals, tickets);
	}

	public TrainerMyPageResponse readTrainerMyPage(Member user) {
		TrainerInfo trainerInfo = trainerInfoRepository.findByUser(user);
		Gym gym = trainerInfo.getGym();
		List<TrainingProgram> trainingPrograms = trainerInfo.getTrainingProgramList();
		List<Qualification> qualifications = trainerInfo.getQualificationList();

		return TrainerMyPageResponse.toResponse(user, trainerInfo, gym, trainingPrograms, qualifications);
	}

	public SearchTrainerResponse searchTrainers(String keyWord, GoalType category, String location, Integer minPrice,
		Integer maxPrice) {
		Pageable pageable = PageRequest.of(0, 10); // 페이지 번호와 크기를 설정할 수 있습니다.
		Page<TrainerInfo> trainerPage = trainerInfoRepository.findAllByFilters(keyWord, category, location, pageable);

		List<SearchTrainerResponse.FoundTrainer> foundTrainers = trainerPage.getContent().stream()
			.map(trainer -> new SearchTrainerResponse.FoundTrainer(
				trainer.getUser().getProfileImageUrl(),
				trainer.getId(),
				trainer.getUser().getUsername(),
				trainer.getGym().getAddress(),
				trainer.getUser().getPhone(),
				trainer.getProfileDescription(),
				trainer.getGoalList().stream().map(Goal::getGoalType).collect(Collectors.toList())))
			.collect(Collectors.toList());

		return new SearchTrainerResponse(foundTrainers, trainerPage.getTotalPages(), trainerPage.getTotalElements(),
			trainerPage.getNumber(), trainerPage.getSize());
	}

	public TrainerMemberManagementResponse readTrainerMembers(Member user) {

		List<Ticket> tickets = ticketRepository.findAllByTrainer(user);

		return TrainerMemberManagementResponse.toResponse(tickets);
	}

	public TrainerMemberDetailManagementResponse readTrainerMembersDetail(Member user, String userId) {

		Member member = userRepository.findByUserId(userId);
		Ticket ticket = ticketRepository.findByTrainerAndMember(user, member);

		if (ticket == null) {
			throw new IllegalArgumentException("잘못된 접근: 회원 번호");
		}

		List<Ticket> ticketList = ticketRepository.findAllByMember(member);

		return TrainerMemberDetailManagementResponse.toResponse(member, ticketList);
	}
}
