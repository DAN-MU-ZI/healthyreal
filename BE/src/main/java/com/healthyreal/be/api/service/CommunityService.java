package com.healthyreal.be.api.service;

import com.healthyreal.be.api.controller.community.PostCreateRequest;
import com.healthyreal.be.api.entity.cloud.S3Image;
import com.healthyreal.be.api.entity.community.Comment;
import com.healthyreal.be.api.entity.community.Post;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.repository.community.CommentRepository;
import com.healthyreal.be.api.repository.community.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {
	private final PostRepository postRepository;
	private final CommentRepository commentRepository;
	private final S3Service s3Service;

	@Transactional
	public Post createPost(Member user, String title, String content) {
		Post post = new Post(title, content, LocalDateTime.now(), LocalDateTime.now(), user);
		return postRepository.save(post);
	}

	@Transactional
	public Comment createComment(Member user, Post post, String content) {
		Comment comment = new Comment(content, LocalDateTime.now(), LocalDateTime.now(), post, user);
		return commentRepository.save(comment);
	}

	@Transactional(readOnly = true)
	public List<Post> getAllPosts() {
		return postRepository.findAll();
	}

	@Transactional(readOnly = true)
	public List<Comment> getCommentsByPost(Long postId) {
		return commentRepository.findByPostId(postId);
	}

	public void createPost(Member user, PostCreateRequest request, List<MultipartFile> images) {
		Post post = request.toEntity();
		post.setUser(user);

		List<S3Image> s3Images = s3Service.saveImages(images, "member/posts");
		post.getImages().addAll(s3Images);

		postRepository.save(post);
	}
}
