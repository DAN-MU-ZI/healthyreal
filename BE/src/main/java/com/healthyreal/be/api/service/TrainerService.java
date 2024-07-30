package com.healthyreal.be.api.service;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.healthyreal.be.api.controller.trainer.TrainerRequest;
import com.healthyreal.be.api.entity.Meal;
import com.healthyreal.be.api.entity.Ticket;
import com.healthyreal.be.api.entity.cloud.S3Image;
import com.healthyreal.be.api.entity.schedule.Schedule;
import com.healthyreal.be.api.entity.trainer.Qualification;
import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.trainer.TrainerMainPageResponse;
import com.healthyreal.be.api.entity.trainer.TrainerSchedule;
import com.healthyreal.be.api.entity.trainer.TrainingProgram;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.Gym;
import com.healthyreal.be.api.repository.MealRepository;
import com.healthyreal.be.api.repository.TicketRepository;
import com.healthyreal.be.api.repository.schedule.ScheduleRepository;
import com.healthyreal.be.api.repository.trainer.TrainerInfoRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TrainerService {
	private final TrainerInfoRepository trainerInfoRepository;
	private final S3Service s3Service;
	private final ScheduleRepository scheduleRepository;
	private final MealRepository mealRepository;
	private final TicketRepository ticketRepository;

	@PersistenceContext
	private EntityManager entityManager;

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

		List<S3Image> s3Images = s3Service.saveImages(qualificationImages, "trainer/qualification");
		Iterator<S3Image> imageIterator = s3Images.iterator();

		qualifications.forEach(qualification -> {
			if (imageIterator.hasNext()) {
				qualification.setImage(imageIterator.next());
			}
		});
		List<S3Image> trainingProgramImagesList = s3Service.saveImages(trainingProgramImages,
			"trainer/trainingProgram");
		trainingProgram.addAllImage(trainingProgramImagesList);

		TrainerInfo trainerInfo = createTrainerInfo(user, gym, goals, qualifications, trainingProgram, trainerSchedules,
			profileDescription);
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
		final String profileDescription
	) {
		return new TrainerInfo(user, gym, goals, qualifications, trainingProgram, trainerSchedules, profileDescription);
	}

	public TrainerMainPageResponse getMainPageByTrainer(Member user) {

		//식단 3개
		List<Meal> meals =
			mealRepository.findMealsWithoutComment(user, LocalDate.now())
				.stream()
				.limit(3)
				.toList();

		//일정 3개
		List<Schedule> schedules =
			scheduleRepository.findSchedules(user, LocalDate.now())
				.stream()
				.limit(3)
				.toList();

		//회원 3개
		List<Ticket> tickets =
			ticketRepository.findAllByTrainer(user)
				.stream()
				.limit(3)
				.toList();

		return TrainerMainPageResponse.toResponse(schedules, meals, tickets);
	}
/*
	private List<Meal> getMeals(Member user) {
		String jpql = "SELECT m "
			+ "FROM Meal m "
			+ "JOIN Ticket t ON m.member = t.member "
			+ "WHERE t.trainer = :trainer AND t.endPoint > :date AND m.comment IS NULL";

		TypedQuery<Meal> query = entityManager.createQuery(jpql, Meal.class);

		query.setParameter("trainer", user);
		query.setParameter("date", LocalDate.now());
		query.setMaxResults(3);

		return query.getResultList();
	}
*/
/*
	private List<Schedule> getTodaySchedule3(Member user) {
		String jpql = "select s "
			+ "from Schedule s "
			+ "where s.trainer = :trainer and s.scheduleDate = :date and s.lessonYn = 'Y'";
		TypedQuery<Schedule> query = entityManager.createQuery(jpql, Schedule.class);

		query.setParameter("trainer", user);
		query.setParameter("date", LocalDate.now());
		query.setMaxResults(3);
		return query.getResultList();
	}
*/
}
