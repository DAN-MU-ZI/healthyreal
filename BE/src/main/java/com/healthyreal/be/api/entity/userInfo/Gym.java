package com.healthyreal.be.api.entity.userInfo;

import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Entity
public class Gym {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String address;

	@Setter
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_info_id")
	private UserInfo userInfo;

	@Setter
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "trainer_info_id")
	private TrainerInfo trainerInfo;

	public Gym(final String name, final String address) {
		this.name = name;
		this.address = address;
	}
}
