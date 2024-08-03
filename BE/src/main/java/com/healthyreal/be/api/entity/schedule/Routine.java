package com.healthyreal.be.api.entity.schedule;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Routine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "routine_id", nullable = false)
	private Long id;

	@Column(nullable = false)
	private String weightName;

	@Column(nullable = false)
	private Long weight;

	@Column(nullable = false)
	private Long repetition;

	@ManyToOne
	@JoinColumn(name = "schedule_id", nullable = false)
	private Schedule schedule;

}
