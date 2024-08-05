package com.healthyreal.be.api.controller.community;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthyreal.be.api.controller.community.dto.CommentsOfPostResponse;
import com.healthyreal.be.api.controller.community.dto.PostCreateRequest;
import com.healthyreal.be.api.entity.community.Post;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.service.CommunityService;
import com.healthyreal.be.utils.CurrentUser;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/community")
@RequiredArgsConstructor
public class CommunityController {
	private final CommunityService communityService;

	@PostMapping(value = "/posts", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> createPost(
		@CurrentUser Member user,
		@RequestPart(value = "data") PostCreateRequest request,
		@RequestPart(value = "images", required = false) List<MultipartFile> images
	) {
		communityService.createPost(user, request, images);
		return ResponseEntity.ok("ok");
	}

	@PostMapping("/posts/{postId}/comments")
	public ResponseEntity<String> createComment(
		@CurrentUser Member user,
		@PathVariable(value = "postId") Long postId,
		@RequestParam String content
	) {
		Post post = communityService.findPostById(postId);

		communityService.createComment(user, post, content);
		return ResponseEntity.ok("ok");
	}

	@GetMapping("/posts")
	public ResponseEntity<List<Post>> getAllPosts() {
		List<Post> posts = communityService.getAllPosts();
		return ResponseEntity.ok(posts);
	}

	@GetMapping("/posts/{postId}/comments")
	public ResponseEntity<CommentsOfPostResponse> getCommentsByPost(@PathVariable(value = "postId") Long postId) {
		CommentsOfPostResponse response = CommentsOfPostResponse.of(communityService.getCommentsByPost(postId));
		return ResponseEntity.ok(response);
	}
}