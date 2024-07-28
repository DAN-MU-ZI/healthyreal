package com.healthyreal.be.api.entity.trainer;

import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.Gym;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

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
	private final List<Schedule> scheduleList = new ArrayList<>();

	@Column(length = 1024)
	private String profileDescription;

	public TrainerInfo(final Member user, final Gym gym, final List<Goal> goals,
		final List<Qualification> qualificationList, final TrainingProgram trainingProgram,
		final List<Schedule> scheduleList, final String profileDescription) {
		this.user = user;
		this.goalList.addAll(goals);
		this.gym = gym;
		this.qualificationList.addAll(qualificationList);
		this.trainingProgramList.add(trainingProgram);
		this.scheduleList.addAll(scheduleList);
		this.profileDescription = profileDescription;

		goalList.forEach(x -> x.setTrainerInfo(this));
		gym.setTrainerInfo(this);
		qualificationList.forEach(x -> x.setTrainerInfo(this));
		trainingProgram.setTrainerInfo(this);
		scheduleList.forEach(x -> x.setTrainerInfo(this));
	}
}