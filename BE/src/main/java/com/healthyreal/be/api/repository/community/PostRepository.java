package com.healthyreal.be.api.repository.community;

import com.healthyreal.be.api.entity.community.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
