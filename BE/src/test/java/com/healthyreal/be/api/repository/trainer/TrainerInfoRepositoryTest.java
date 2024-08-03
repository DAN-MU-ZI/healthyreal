package com.healthyreal.be.api.repository.trainer;

import com.healthyreal.be.api.controller.trainer.TrainerRequest;
import com.healthyreal.be.api.controller.trainer.TrainerRequest.GymDto;
import com.healthyreal.be.api.entity.cloud.S3Image;
import com.healthyreal.be.api.entity.trainer.*;
import com.healthyreal.be.api.entity.user.Gender;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.GoalType;
import com.healthyreal.be.api.entity.userInfo.Gym;
import com.healthyreal.be.api.repository.cloud.S3ImageRepository;
import com.healthyreal.be.api.repository.user.UserRepository;
import com.healthyreal.be.api.repository.userInfo.GoalRepository;
import com.healthyreal.be.api.repository.userInfo.GymRepository;
import com.healthyreal.be.oauth.entity.ProviderType;
import com.healthyreal.be.oauth.entity.RoleType;
import org.apache.http.entity.ContentType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class TrainerInfoRepositoryTest {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TrainerInfoRepository trainerInfoRepository;
	@Autowired
	private GymRepository gymRepository;
	@Autowired
	private GoalRepository goalRepository;
	@Autowired
	private QualificationRepository qualificationRepository;
	@Autowired
	private TrainingProgramRepository trainingProgramRepository;
	@Autowired
	private S3ImageRepository s3ImageRepository;
	@Autowired
	private TrainerScheduleRepository trainerScheduleRepository;

	@Test
	void saveTrainerInfo() {
		Member user = new Member(
			"hello",
			"Test User",
			"testuser@example.com",
			"Y",
			"",
			ProviderType.KAKAO,
			RoleType.USER,
			LocalDateTime.now(),
			LocalDateTime.now()
		);
		userRepository.saveAndFlush(user);

		// GymDto 객체 생성
		GymDto gymDto = new GymDto("Fitness Center", "123 Main St, Anytown, USA");

		// GoalType 리스트 생성 (예시로 문자열로 대체)
		List<GoalType> goalTypes = List.of(GoalType.WEIGHT_LOSS, GoalType.MUSCLE_GAIN);

		// QualificationDto 리스트 생성
		List<TrainerRequest.QualificationDto> qualificationDtoList = new ArrayList<>();
		qualificationDtoList.add(new TrainerRequest.QualificationDto(
			"Certified Personal Trainer",
			QualificationCategory.CERTIFICATION,
			LocalDate.of(2023, 1, 1),
			LocalDate.of(2024, 1, 1),
			"Nationally recognized certification."
		));
		qualificationDtoList.add(new TrainerRequest.QualificationDto(
			"Nutrition Specialist",
			QualificationCategory.CERTIFICATION,
			LocalDate.of(2022, 5, 1),
			LocalDate.of(2023, 5, 1),
			"Specialized in sports nutrition."
		));

		// TrainingProgramDto 객체 생성
		TrainerRequest.TrainingProgramDto trainingProgramDto = new TrainerRequest.TrainingProgramDto(
			"Beginner Training Program",
			"A program designed for beginners.",
			List.of(GoalType.WEIGHT_LOSS, GoalType.BODY_PROFILE)
		);

		// ScheduleDto 리스트 생성
		List<TrainerRequest.ScheduleDto> scheduleDtoList = new ArrayList<>();
		scheduleDtoList.add(new TrainerRequest.ScheduleDto(DayOfWeek.MONDAY, LocalTime.of(9, 0), LocalTime.of(10, 0)));
		scheduleDtoList.add(
			new TrainerRequest.ScheduleDto(DayOfWeek.WEDNESDAY, LocalTime.of(9, 0), LocalTime.of(10, 0)));
		scheduleDtoList.add(new TrainerRequest.ScheduleDto(DayOfWeek.FRIDAY, LocalTime.of(9, 0), LocalTime.of(10, 0)));

		// TrainerRequest 객체 생성
		TrainerRequest request = new TrainerRequest(
			gymDto,
			goalTypes,
			qualificationDtoList,
			trainingProgramDto,
			scheduleDtoList,
			"Passionate trainer with 5 years of experience."
		);

		Gym gym = request.gymDto().toEntity();
		List<Goal> goals = request.goalTypesToEntity();
		List<Qualification> qualificationList = request.qualificationDtoListToEntity();
		TrainingProgram trainingProgram = request.trainingProgramDto().toEntity();
		List<TrainerSchedule> scheduleList = request.scheduleDtoListToEntity();
		String profileDescription = request.profileDescription();

		qualificationList.forEach(qualification -> {
			S3Image s3Image = new S3Image("/test", qualification.getContent(), LocalDateTime.now(), 100L,
				ContentType.IMAGE_PNG.getMimeType());
			qualification.setImage(s3Image);
		});

		String imageDir = "/test";
		List<S3Image> imageList = Arrays.asList(
			new S3Image(imageDir, "/file1", LocalDateTime.now(), 100L, ContentType.IMAGE_PNG.getMimeType()),
			new S3Image(imageDir, "/file2", LocalDateTime.now(), 100L, ContentType.IMAGE_PNG.getMimeType()),
			new S3Image(imageDir, "/file3", LocalDateTime.now(), 100L, ContentType.IMAGE_PNG.getMimeType()),
			new S3Image(imageDir, "/file4", LocalDateTime.now(), 100L, ContentType.IMAGE_PNG.getMimeType())
		);
		trainingProgram.addAllImage(imageList);

		TrainerInfo trainerInfo = new TrainerInfo(user,
			gym,
			goals,
			qualificationList,
			trainingProgram,
			scheduleList,
			profileDescription,
			Gender.MALE);

		trainerInfoRepository.save(trainerInfo);

		assertThat(userRepository.findAll().size()).isEqualTo(1);
		assertThat(gymRepository.findAll().size()).isEqualTo(1);
		assertThat(goalRepository.findAll().size()).isEqualTo(goals.size() + trainingProgram.getGoalList().size());
		assertThat(qualificationRepository.findAll().size()).isEqualTo(qualificationList.size());
		assertThat(trainingProgramRepository.findAll().size()).isEqualTo(1);
		assertThat(trainerInfoRepository.findAll().size()).isEqualTo(1);
		assertThat(s3ImageRepository.findAll().size()).isEqualTo(
			trainerInfo.getQualificationList().size() + imageList.size());

	}

	@Test
	void findAllByFilters() {
		// Create and save Member
		Member user = new Member(
			"username",
			"Test User",
			"testuser@example.com",
			"Y",
			"",
			ProviderType.KAKAO,
			RoleType.USER,
			LocalDateTime.now(),
			LocalDateTime.now()
		);
		userRepository.saveAndFlush(user);

		// Create and save Gym
		Gym gym = new Gym("Fitness Center", "test location");
		gymRepository.saveAndFlush(gym);

		// Create and save Goals
		List<Goal> goals = List.of(new Goal(GoalType.WEIGHT_LOSS), new Goal(GoalType.MUSCLE_GAIN));
		goalRepository.saveAll(goals);

		// Create and save Qualifications
		List<Qualification> qualifications = List.of(
			new Qualification("Certified Personal Trainer", QualificationCategory.CERTIFICATION,
				LocalDate.of(2023, 1, 1), LocalDate.of(2024, 1, 1), "Nationally recognized certification."),
			new Qualification("Nutrition Specialist", QualificationCategory.CERTIFICATION, LocalDate.of(2022, 5, 1),
				LocalDate.of(2023, 5, 1), "Specialized in sports nutrition.")
		);
		qualificationRepository.saveAll(qualifications);

		// Create and save Training Program
		TrainingProgram trainingProgram = new TrainingProgram(
			"Beginner Training Program",
			"A program designed for beginners.",
			Stream.of(GoalType.WEIGHT_LOSS, GoalType.BODY_PROFILE).map(Goal::new)
				.collect(Collectors.toList())
		);
		trainingProgramRepository.saveAndFlush(trainingProgram);

		// Create and save Schedules
		List<TrainerSchedule> schedules = List.of(
			new TrainerSchedule(DayOfWeek.MONDAY, LocalTime.of(9, 0), LocalTime.of(10, 0)),
			new TrainerSchedule(DayOfWeek.WEDNESDAY, LocalTime.of(9, 0), LocalTime.of(10, 0)),
			new TrainerSchedule(DayOfWeek.FRIDAY, LocalTime.of(9, 0), LocalTime.of(10, 0))
		);
		trainerScheduleRepository.saveAll(schedules);

		// Create and save TrainerInfo
		TrainerInfo trainerInfo = new TrainerInfo(
			user,
			gym,
			goals,
			qualifications,
			trainingProgram,
			schedules,
			"Passionate trainer with 5 years of experience.",
			Gender.MALE
		);
		trainerInfoRepository.saveAndFlush(trainerInfo);

		// Test the repository method
		Pageable pageable = PageRequest.of(0, 10);
		//		Page<TrainerInfo> result = trainerInfoRepository.findAllByFilters("username", GoalType.WEIGHT_LOSS,
		//			"test location", pageable);
		Page<TrainerInfo> result = trainerInfoRepository.findAllByFilters("trainer", null,
			null, pageable);

		assertNotNull(result);
		assertEquals(1, result.getTotalElements());
		assertThat(result.getContent()).extracting("user.username").containsExactly("Test User");
	}
}