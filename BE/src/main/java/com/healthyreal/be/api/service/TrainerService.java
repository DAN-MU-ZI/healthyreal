package com.healthyreal.be.api.service;

import com.healthyreal.be.api.controller.trainer.TrainerRequest;
import com.healthyreal.be.api.entity.cloud.S3Image;
import com.healthyreal.be.api.entity.trainer.Qualification;
import com.healthyreal.be.api.entity.trainer.Schedule;
import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.trainer.TrainingProgram;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.Gym;
import com.healthyreal.be.api.repository.trainer.TrainerInfoRepository;
import jakarta.transaction.Transactional;
import java.util.Iterator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class TrainerService {
	private final TrainerInfoRepository trainerInfoRepository;
	private final S3Service s3Service;

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
		List<Schedule> schedules = request.scheduleDtoListToEntity();
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

		TrainerInfo trainerInfo = createTrainerInfo(user, gym, goals, qualifications, trainingProgram, schedules,
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
		final List<Schedule> schedules,
		final String profileDescription
	) {
		return new TrainerInfo(user, gym, goals, qualifications, trainingProgram, schedules, profileDescription);
	}

}
