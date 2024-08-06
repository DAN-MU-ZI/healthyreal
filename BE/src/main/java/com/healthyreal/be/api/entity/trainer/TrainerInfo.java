package com.healthyreal.be.api.entity.trainer;

import com.healthyreal.be.api.entity.user.Gender;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.Gym;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class TrainerInfo {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private Member user;

	@OneToOne(mappedBy = "trainerInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Gym gym;

	@OneToMany(mappedBy = "trainerInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private final List<Goal> goalList = new ArrayList<>();

	@OneToMany(mappedBy = "trainerInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private final List<Qualification> qualificationList = new ArrayList<>();

	@OneToMany(mappedBy = "trainerInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private final List<TrainingProgram> trainingProgramList = new ArrayList<>();

	@OneToMany(mappedBy = "trainerInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private final List<TrainerSchedule> trainerScheduleList = new ArrayList<>();

	@Column(length = 1024)
	private String profileDescription;

	public TrainerInfo(final Member user, final Gym gym, final List<Goal> goals,
		final List<Qualification> qualificationList, final TrainingProgram trainingProgram,
		final List<TrainerSchedule> trainerScheduleList, final String profileDescription,
		final Gender gender) {
		this.user = user;
		this.goalList.addAll(goals);
		this.gym = gym;
		this.user.setGender(gender);
		this.qualificationList.addAll(qualificationList);
		this.trainingProgramList.add(trainingProgram);
		this.trainerScheduleList.addAll(trainerScheduleList);
		this.profileDescription = profileDescription;

		goalList.forEach(x -> x.setTrainerInfo(this));
		gym.setTrainerInfo(this);
		qualificationList.forEach(x -> x.setTrainerInfo(this));
		trainingProgram.setTrainerInfo(this);
		trainerScheduleList.forEach(x -> x.setTrainerInfo(this));
	}
}
