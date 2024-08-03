package com.healthyreal.be.api.entity.userschedule;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class UserSchedule {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private LocalDateTime startDateTime;

	@Column(nullable = false)
	private LocalDateTime endDateTime;

	@Column(nullable = false)
	private String content;

	@Column(nullable = false)
	private boolean lessonYn;

	@Column(nullable = false)
	private String title;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	public UserSchedule(LocalDateTime startDateTime, LocalDateTime endDateTime, String content, boolean lessonYn, String title) {
		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;
		this.content = content;
		this.lessonYn = lessonYn;
		this.title = title;
	}
}