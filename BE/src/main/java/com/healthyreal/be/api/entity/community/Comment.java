package com.healthyreal.be.api.entity.community;

import com.healthyreal.be.api.entity.user.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id", nullable = false)
	private Long id;

	@Column(nullable = false)
	private String content;

	// Post 엔티티와의 관계를 추가합니다.
	@ManyToOne
	@JoinColumn(name = "post_id", nullable = false)
	private Post post;

	@ManyToOne
	@JoinColumn(name = "user_seq", nullable = false)
	private Member member;

	public Comment(String content, Post post, Member member) {
		this.content = content;
		this.post = post;
		this.member = member;
	}
}