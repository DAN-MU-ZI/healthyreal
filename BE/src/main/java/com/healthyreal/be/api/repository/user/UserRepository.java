package com.healthyreal.be.api.repository.user;

import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.community.Post;
import com.healthyreal.be.api.entity.community.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Member, Long> {
	Member findByUserId(String userId);

}

public interface PostRepository extends JpaRepository<Post, Long> {
}

public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findByPostId(Long postId);
}