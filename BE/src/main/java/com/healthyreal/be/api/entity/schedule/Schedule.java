package com.healthyreal.be.api.entity.schedule;

import java.time.LocalDate;
import java.time.LocalTime;

import com.healthyreal.be.api.entity.user.Member;

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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Schedule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "schedule_id", nullable = false)
	private Long scheduleId;

	@ManyToOne
	@JoinColumn(name = "member_seq", nullable = false)
	private Member member;

	@ManyToOne
	@JoinColumn(name = "trainer_seq", nullable = false)
	private Member trainer;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private LocalDate scheduleDate;

	@Column(nullable = false)
	private LocalTime startTime;

	@Column(nullable = false)
	private LocalTime endTime;

	@Column(name = "content", length = 255)
	private String content;

	@Column(nullable = false, length = 1)
	private String lessonYn;
}
