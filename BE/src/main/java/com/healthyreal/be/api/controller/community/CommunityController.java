package com.healthyreal.be.api.controller.community;

import com.healthyreal.be.api.entity.community.Post;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.service.CommunityService;
import com.healthyreal.be.utils.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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