package com.healthyreal.be.api.entity.community;

import com.healthyreal.be.api.entity.user.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(max = 500)
	@Column(name = "CONTENT", length = 500)
	private String content;

	@NotNull
	@Column(name = "CREATED_AT")
	private LocalDateTime createdAt;

	@NotNull
	@Column(name = "MODIFIED_AT")
	private LocalDateTime modifiedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "POST_ID")
	private Post post;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID")
	private Member user;

	public Comment(
		@NotNull @Size(max = 500) String content,
		@NotNull LocalDateTime createdAt,
		@NotNull LocalDateTime modifiedAt,
		Post post,
		Member user
	) {
		this.content = content;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.post = post;
		this.user = user;
	}
}