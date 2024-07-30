package com.healthyreal.be.api.entity.userInfo;

import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.trainer.TrainingProgram;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

@Getter
@NoArgsConstructor
@Entity
public class Goal {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private GoalType goalType;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_info_id")
	private UserInfo userInfo;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "training_program_id")
	private TrainingProgram trainingProgram;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "trainer_info_id")
	private TrainerInfo trainerInfo;

	public Goal(final GoalType goalType) {
		this.goalType = goalType;
	}
}
