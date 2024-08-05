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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/community")
@RequiredArgsConstructor
@Tag(name = "커뮤니티", description = "커뮤니티 관련 API를 제공하는 컨트롤러")
public class CommunityController {
	private final CommunityService communityService;

	@Operation(
		summary = "새 게시물 생성",
		description = "주어진 데이터와 선택적인 이미지를 사용하여 새 게시물을 생성합니다.",
		parameters = {
			@Parameter(name = "data", description = "게시물 생성을 위한 데이터", required = true),
			@Parameter(name = "images", description = "선택적인 게시물 이미지", required = false)
		}
	)
	@PostMapping(value = "/posts", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> createPost(
		@CurrentUser Member user,
		@RequestPart(value = "data") PostCreateRequest request,
		@RequestPart(value = "images", required = false) List<MultipartFile> images) {
		communityService.createPost(user, request, images);
		return ResponseEntity.ok("ok");
	}

	@Operation(
		summary = "새 댓글 생성",
		description = "주어진 게시물 ID와 내용으로 새 댓글을 생성합니다.",
		parameters = {
			@Parameter(name = "postId", description = "댓글을 추가할 게시물의 ID", required = true),
			@Parameter(name = "content", description = "댓글의 내용", required = true)
		}
	)
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

	@Operation(
		summary = "모든 게시물 조회",
		description = "모든 게시물의 목록을 조회합니다."
	)
	@GetMapping("/posts")
	public ResponseEntity<List<Post>> getAllPosts() {
		List<Post> posts = communityService.getAllPosts();
		return ResponseEntity.ok(posts);
	}

	@Operation(
		summary = "게시물의 모든 댓글 조회",
		description = "주어진 게시물 ID로 해당 게시물의 모든 댓글을 조회합니다.",
		parameters = {
			@Parameter(name = "postId", description = "댓글을 조회할 게시물의 ID", required = true)
		}
	)
	@GetMapping("/posts/{postId}/comments")
	public ResponseEntity<CommentsOfPostResponse> getCommentsByPost(@PathVariable(value = "postId") Long postId) {
		CommentsOfPostResponse response = CommentsOfPostResponse.of(communityService.getCommentsByPost(postId));
		return ResponseEntity.ok(response);
	}
}
