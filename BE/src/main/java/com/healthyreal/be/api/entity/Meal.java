package com.healthyreal.be.api.entity;

import com.healthyreal.be.api.entity.community.Comment;
import com.healthyreal.be.api.entity.user.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Meal extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "meal_id", nullable = false)
	private Long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String content;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private MealType mealType;

	@ManyToOne
	@JoinColumn(name = "user_seq", nullable = false)
	private Member member;

	@OneToOne
	@JoinColumn(name = "comment_id")
	private Comment comment;

	@Column(nullable = false)
	private LocalDate date;
}

