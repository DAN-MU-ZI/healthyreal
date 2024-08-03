package com.healthyreal.be.api.controller.community;

import com.healthyreal.be.api.entity.community.Post;
import com.healthyreal.be.api.entity.community.Comment;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.service.CommunityService;
import com.healthyreal.be.utils.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/community")
@RequiredArgsConstructor
public class CommunityController {
	private final CommunityService communityService;

	@PostMapping("/posts")
	public ResponseEntity<Post> createPost(
		@CurrentUser Member user,
		@RequestParam String title,
		@RequestParam String content
	) {
		Post post = communityService.createPost(user, title, content);
		return ResponseEntity.ok(post);
	}

	@PostMapping("/posts/{postId}/comments")
	public ResponseEntity<Comment> createComment(
		@CurrentUser Member user,
		@PathVariable Long postId,
		@RequestParam String content
	) {
		Post post = communityService.getAllPosts().stream()
			.filter(p -> p.getId().equals(postId))
			.findFirst()
			.orElseThrow(() -> new RuntimeException("Post not found"));

		Comment comment = communityService.createComment(user, post, content);
		return ResponseEntity.ok(comment);
	}

	@GetMapping("/posts")
	public ResponseEntity<List<Post>> getAllPosts() {
		List<Post> posts = communityService.getAllPosts();
		return ResponseEntity.ok(posts);
	}

	@GetMapping("/posts/{postId}/comments")
	public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long postId) {
		List<Comment> comments = communityService.getCommentsByPost(postId);
		return ResponseEntity.ok(comments);
	}
}