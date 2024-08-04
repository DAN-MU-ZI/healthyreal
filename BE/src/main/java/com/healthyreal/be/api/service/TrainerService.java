package com.healthyreal.be.api.service;

import com.healthyreal.be.api.controller.trainer.SearchTrainerResponse;
import com.healthyreal.be.api.controller.trainer.TrainerRequest;
import com.healthyreal.be.api.entity.Meal;
import com.healthyreal.be.api.entity.Ticket;
import com.healthyreal.be.api.entity.schedule.Schedule;
import com.healthyreal.be.api.entity.trainer.Qualification;
import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.trainer.TrainerSchedule;
import com.healthyreal.be.api.entity.trainer.TrainingProgram;
import com.healthyreal.be.api.entity.trainer.dto.TicketRegisterRequest;
import com.healthyreal.be.api.entity.trainer.dto.ProgramListResponse;
import com.healthyreal.be.api.entity.trainer.dto.TrainerMainPageResponse;
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
import com.healthyreal.be.api.repository.trainer.TrainingProgramRepository;
import com.healthyreal.be.api.repository.user.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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
	private final TrainingProgramRepository trainingProgramRepository;
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

	public ProgramListResponse getProgramList(Member trainer){
		TrainerInfo trainerInfo = trainerInfoRepository.findByUser(trainer);
		List<TrainingProgram> programList = trainingProgramRepository.findAllByTrainerInfo(trainerInfo);
		return ProgramListResponse.toResponse(programList);
	}

	/**
	 * @param userId
	 * @return userId 존재시 이름을 없으면 null 반환
	 */
	public String checkMember(String userId) {
		Member member = userRepository.findByUserId(userId);
		if (member == null)
			return null;
		return member.getUsername();
	}

	public void registerTicket(Member trainer, TicketRegisterRequest request) {
		Member member = userRepository.findByUserId(request.userId());
		TrainerInfo trainerInfo = trainerInfoRepository.findByUser(trainer);
		TrainingProgram trainingProgram = trainingProgramRepository.findByTitleAndTrainerInfo(
			request.programName(), trainerInfo);
		Ticket ticket = new Ticket(member, trainer, trainingProgram, request.totalCnt(),
			request.endPoint(),
			request.memo());

		saveTicketWithoutRollback(ticket);
	}

	@Transactional(dontRollbackOn = Exception.class)
	public void saveTicketWithoutRollback(Ticket ticket) {
		ticketRepository.save(ticket);
	}
}
