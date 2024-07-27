package com.healthyreal.be.api.entity.trainer;

import com.healthyreal.be.api.entity.cloud.S3Image;
import com.healthyreal.be.api.entity.userInfo.Goal;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Entity
public class TrainingProgram {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String title;
	private String description;

	@OneToMany(mappedBy = "trainingProgram", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private final List<Goal> goalList = new ArrayList<>();

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "trainer_info_id")
	private TrainerInfo trainerInfo;

	@OneToMany(mappedBy = "trainingProgram", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private final List<S3Image> imageList = new ArrayList<>();

	public TrainingProgram(String title, String description, List<Goal> goalList) {
		this.title = title;
		this.description = description;
		this.goalList.addAll(goalList);

		goalList.forEach(goal -> goal.setTrainingProgram(this));
	}

	public void addAllImage(List<S3Image> imageList) {
		this.imageList.addAll(imageList);
		imageList.forEach(image -> image.setTrainingProgram(this));
	}
}
