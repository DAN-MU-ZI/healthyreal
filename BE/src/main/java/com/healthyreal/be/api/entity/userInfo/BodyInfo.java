package com.healthyreal.be.api.entity.userInfo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Entity
public class BodyInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private LocalDate birthDate;

	@Column(nullable = false)
	private Double height;

	@Column(nullable = false)
	private Double weight;

	@Setter
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_info_id")
	private UserInfo userInfo;

	public BodyInfo(LocalDate birthDate, Double height, Double weight) {
		this.birthDate = birthDate;
		this.height = height;
		this.weight = weight;
	}
}