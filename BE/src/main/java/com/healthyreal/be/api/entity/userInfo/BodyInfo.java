package com.healthyreal.be.api.entity.userInfo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class BodyInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private LocalDate birthDate;

	@Column(nullable = false)
	private Double height;

	@Column(nullable = false)
	private Double weight;

	public BodyInfo(LocalDate birthDate, Double height, Double weight) {
		this.birthDate = birthDate;
		this.height = height;
		this.weight = weight;
	}
}