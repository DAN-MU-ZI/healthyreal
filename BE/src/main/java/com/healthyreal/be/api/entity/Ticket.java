package com.healthyreal.be.api.entity;

import java.time.LocalDate;

import javax.xml.stream.events.EndDocument;

import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.trainer.TrainingProgram;
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

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ticket_id", nullable = false)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "member_seq", nullable = false)
	private Member member;

	@ManyToOne
	@JoinColumn(name = "trainer_seq", nullable = false)
	private Member trainer;

	@ManyToOne
	@JoinColumn(name = "trainingProgram_id")
	private TrainingProgram trainingProgram;

	@Column(nullable = false)
	private Long totalCnt;

	@Column(nullable = false)
	private Long remainingCnt;

	@Column(nullable = false)
	private LocalDate endPoint;

	@Column(nullable = false)
	private String memo;

	public Ticket(Member member, Member trainer, TrainingProgram trainingProgram, Long totalCnt, LocalDate endPoint, String memo) {
		this.member = member;
		this.trainer = trainer;
		this.trainingProgram = trainingProgram;
		this.totalCnt = totalCnt;
		this.remainingCnt = totalCnt;
		this.endPoint = endPoint;
		this.memo = memo;
	}
}
