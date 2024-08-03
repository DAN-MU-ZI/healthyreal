package com.healthyreal.be.api.controller.community;

import com.healthyreal.be.api.entity.community.Comment;

import java.util.List;
import java.util.stream.Collectors;

public record CommentsOfPostResponse(List<CommentDto> commentDtoList) {

	public static CommentsOfPostResponse of(List<Comment> commentsByPost) {
		return new CommentsOfPostResponse(commentsByPost.stream()
			.map(comment -> new CommentDto(comment.getId(), comment.getContent(), comment.getMember().getUserSeq()))
			.collect(Collectors.toList()));
	}

	public record CommentDto(Long id, String content, Long userSeq) {
	}
}
