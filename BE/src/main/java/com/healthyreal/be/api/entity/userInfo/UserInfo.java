package com.healthyreal.be.api.entity.userInfo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import net.minidev.json.annotate.JsonIgnore;

import com.healthyreal.be.api.entity.user.Gender;
import com.healthyreal.be.api.entity.user.Member;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class UserInfo {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private Member user;

	@OneToMany(mappedBy = "userInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Goal> goalList;

	@OneToMany(mappedBy = "userInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private final List<BodyInfo> bodyInfoList = new ArrayList<>();

	@OneToOne(mappedBy = "userInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Gym gym;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ExerciseLevel exerciseLevel;

	@Column(nullable = false)
	private Boolean agreeToReceive;

	@Column(nullable = false)
	private LocalDate birthDate;

	public UserInfo(final Member user, final List<Goal> goalList, final Gender gender, final BodyInfo bodyInfo,
		final Gym gym, final ExerciseLevel exerciseLevel,
		final Boolean agreeToReceive, LocalDate birthDate) {
		this.user = user;
		this.goalList = goalList;
		this.user.setGender(gender);
		this.bodyInfoList.add(bodyInfo);
		this.gym = gym;
		this.exerciseLevel = exerciseLevel;
		this.agreeToReceive = agreeToReceive;
		this.birthDate = birthDate;

		goalList.forEach(goal -> goal.setUserInfo(this));
		bodyInfo.setUserInfo(this);
		gym.setUserInfo(this);
	}
}
