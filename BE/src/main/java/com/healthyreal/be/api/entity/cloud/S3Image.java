package com.healthyreal.be.api.entity.cloud;

import com.healthyreal.be.api.entity.community.Post;
import com.healthyreal.be.api.entity.trainer.Qualification;
import com.healthyreal.be.api.entity.trainer.TrainingProgram;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class S3Image {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String fileName;

	@Column(nullable = false, length = 2048)
	private String url;

	@Column(nullable = false)
	private LocalDateTime uploadDate;

	@Column(nullable = false)
	private Long fileSize;

	@Column(nullable = false)
	private String contentType;

	@Setter
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "qualification_id")
	private Qualification qualification;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "trainer_program_id")
	private TrainingProgram trainingProgram;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;

	public S3Image(String fileName, String url, LocalDateTime uploadDate, Long fileSize, String contentType) {
		this.fileName = fileName;
		this.url = url;
		this.uploadDate = uploadDate;
		this.fileSize = fileSize;
		this.contentType = contentType;
	}
}
