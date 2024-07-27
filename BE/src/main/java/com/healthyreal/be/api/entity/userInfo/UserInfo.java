package com.healthyreal.be.api.entity.userInfo;

import com.healthyreal.be.api.entity.user.Member;
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

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private Member user;

	@OneToMany(mappedBy = "userInfo", fetch = FetchType.LAZY)
	private List<Goal> goalList;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Gender gender;

	@OneToOne(mappedBy = "userInfo", fetch = FetchType.LAZY)
	private BodyInfo bodyInfo;

	@OneToOne(mappedBy = "userInfo", fetch = FetchType.LAZY)
	private Gym gym;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ExerciseLevel exerciseLevel;

	@Column(nullable = false)
	private Boolean agreeToReceive;

	public UserInfo(final Member user, final List<Goal> goalList, final Gender gender, final BodyInfo bodyInfo,
		final Gym gym, final ExerciseLevel exerciseLevel,
		final Boolean agreeToReceive) {
		this.user = user;
		this.goalList = goalList;
		this.gender = gender;
		this.bodyInfo = bodyInfo;
		this.gym = gym;
		this.exerciseLevel = exerciseLevel;
		this.agreeToReceive = agreeToReceive;
	}
}
