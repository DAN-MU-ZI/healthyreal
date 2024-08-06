package com.healthyreal.be.api.entity.community;

import com.healthyreal.be.api.entity.cloud.S3Image;
import com.healthyreal.be.api.entity.user.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(max = 100)
	@Column(name = "TITLE", length = 100)
	private String title;

	@NotNull
	@Size(max = 1000)
	@Column(name = "CONTENT", length = 1000)
	private String content;

	@NotNull
	@Column(name = "CREATED_AT")
	private LocalDateTime createdAt;

	@NotNull
	@Column(name = "MODIFIED_AT")
	private LocalDateTime modifiedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID")
	private Member user;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Comment> comments;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<S3Image> images = new ArrayList<>();

	public Post(
		@NotNull @Size(max = 100) String title,
		@NotNull @Size(max = 1000) String content,
		@NotNull LocalDateTime createdAt,
		@NotNull LocalDateTime modifiedAt,
		Member user
	) {
		this.title = title;
		this.content = content;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.user = user;
	}
}
