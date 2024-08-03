package com.healthyreal.be.api.repository.community;

import com.healthyreal.be.api.entity.community.Comment;
import com.healthyreal.be.api.entity.community.Post;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.repository.user.UserRepository;
import com.healthyreal.be.oauth.entity.ProviderType;
import com.healthyreal.be.oauth.entity.RoleType;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@Transactional
class PostRepositoryTest {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private UserRepository userRepository;
	private Member user;

	@BeforeEach
	void setUp() {
		Member user = new Member(
			"localuser",
			"Local User",
			"localuser@example.com",
			"Y",
			"http://test.com",
			ProviderType.KAKAO,
			RoleType.USER,
			LocalDateTime.now(),
			LocalDateTime.now()
		);
		userRepository.save(user);
	}

	@Test
	void testCreateAndFindPost() {
		Post post = new Post("Test Title", "Test Content", LocalDateTime.now(), LocalDateTime.now(), user);
		postRepository.save(post);

		Post foundPost = postRepository.findById(post.getId()).orElse(null);
		assertNotNull(foundPost);
		assertEquals(post.getTitle(), foundPost.getTitle());
		assertEquals(post.getContent(), foundPost.getContent());
		assertEquals(post.getUser().getUsername(), foundPost.getUser().getUsername());
	}

	@Test
	void testFindAllPosts() {
		Post post1 = new Post("Test Title 1", "Test Content 1", LocalDateTime.now(), LocalDateTime.now(), user);
		Post post2 = new Post("Test Title 2", "Test Content 2", LocalDateTime.now(), LocalDateTime.now(), user);
		postRepository.save(post1);
		postRepository.save(post2);

		List<Post> posts = postRepository.findAll();
		assertEquals(2, posts.size());
	}

	@Test
	void testCreateAndFindComment() {
		Post post = new Post("Test Title", "Test Content", LocalDateTime.now(), LocalDateTime.now(), user);
		postRepository.save(post);

		Comment comment = new Comment("Test Comment", LocalDateTime.now(), LocalDateTime.now(), post, user);
		commentRepository.save(comment);

		List<Comment> comments = commentRepository.findByPostId(post.getId());
		assertEquals(1, comments.size());
		assertEquals(comment.getContent(), comments.get(0).getContent());
	}
}