package com.healthyreal.be.api.repository.community;

import com.healthyreal.be.api.entity.community.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findByPostId(Long postId);
}
