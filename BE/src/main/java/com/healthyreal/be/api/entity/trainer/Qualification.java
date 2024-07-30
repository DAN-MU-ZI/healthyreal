package com.healthyreal.be.api.entity.trainer;

import com.healthyreal.be.api.entity.cloud.S3Image;
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
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Entity
public class Qualification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String content;

	@Enumerated(EnumType.STRING)
	private QualificationCategory category;

	@Column(nullable = false)
	private LocalDate startDate;

	@Column
	private LocalDate endDate;

	@Column
	private String description;

	@OneToOne(mappedBy = "qualification", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private S3Image image;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "trainer_info_id")
	private TrainerInfo trainerInfo;

	public Qualification(final String content, final QualificationCategory category, final LocalDate startDate,
		final LocalDate endDate,
		final String description) {
		this.content = content;
		this.category = category;
		this.startDate = startDate;
		this.endDate = endDate;
		this.description = description;
	}

	public void setImage(final S3Image image) {
		this.image = image;
		image.setQualification(this);
	}
}
