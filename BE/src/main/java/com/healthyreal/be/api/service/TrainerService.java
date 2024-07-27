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
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.http.entity.ContentType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class TrainerService {
	private final TrainerInfoRepository trainerInfoRepository;

	public void register(final Member user,
		final TrainerRequest request,
		final List<MultipartFile> qualificationImages,
		final List<MultipartFile> trainerService
	) {
		Gym gym = request.gymDto().toEntity();
		List<Goal> goals = request.goalTypesToEntity();
		List<Qualification> qualificationList = request.qualificationDtoListToEntity();
		TrainingProgram trainingProgram = request.trainingProgramDto().toEntity();
		List<Schedule> scheduleList = request.scheduleDtoListToEntity();
		String profileDescription = request.profileDescription();

		String imageDir = "/test";

		qualificationList.forEach(qualification -> {
			S3Image s3Image = new S3Image(imageDir, qualification.getContent(), LocalDateTime.now(), 100L,
				ContentType.IMAGE_PNG.getMimeType());
			qualification.setImage(s3Image);
		});

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
			profileDescription);

		trainerInfoRepository.save(trainerInfo);
	}
}
