package com.healthyreal.be.api.entity;

import java.time.LocalDate;

import com.healthyreal.be.api.entity.cloud.S3Image;
import com.healthyreal.be.api.entity.community.Comment;
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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

	@OneToOne(mappedBy = "meal", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private S3Image image;

	public Meal(String title, String content, MealType mealType, LocalDate date) {
		this.title = title;
		this.content = content;
		this.mealType = mealType;
		this.date = date;
	}
}

