package com.healthyreal.be.api.entity.userInfo;

import com.healthyreal.be.api.entity.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class UserInfo {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Enumerated(EnumType.STRING)
	private ExerciseLevel exerciseLevel;

	@OneToMany
	@JoinColumn(name = "goal_id")
	private final List<Goal> goals = new ArrayList<>();

	@OneToOne
	@JoinColumn(name = "body_info_id")
	private BodyInfo bodyInfo;

	@OneToOne
	@JoinColumn(name = "gym_id")
	private Gym gym;

	public UserInfo(final User user, final Gender gender, final ExerciseLevel exerciseLevel, final List<Goal> goals,
		final BodyInfo bodyInfo, final Gym gym) {
		this.user = user;
		this.gender = gender;
		this.exerciseLevel = exerciseLevel;
		this.goals.addAll(goals);
		this.bodyInfo = bodyInfo;
		this.gym = gym;
	}
}
