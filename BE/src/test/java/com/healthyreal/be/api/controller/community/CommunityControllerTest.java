package com.healthyreal.be.api.controller.community;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.repository.user.UserRepository;
import com.healthyreal.be.api.service.CommunityService;
import com.healthyreal.be.oauth.entity.ProviderType;
import com.healthyreal.be.oauth.entity.RoleType;
import com.healthyreal.be.oauth.token.AuthToken;
import com.healthyreal.be.oauth.token.AuthTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CommunityControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private CommunityService communityService;

	@MockBean
	private UserRepository userRepository;

	@Autowired
	private ObjectMapper objectMapper;

	private Member user;
	private AuthToken authToken;

	@Autowired
	private AuthTokenProvider tokenProvider;

	@BeforeEach
	void setUp() {
		System.out.println("Setting up test data...");
		user = new Member(
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

		System.out.println("UserRepository mock: " + userRepository);
		Mockito.when(userRepository.findByUserId("localuser")).thenReturn(user);

		// Create JWT token
		Date expiryDate = Date.from(LocalDateTime.now().plusDays(1).atZone(ZoneId.systemDefault()).toInstant());
		authToken = tokenProvider.createAuthToken(user.getUserId(), user.getRoleType().getCode(), expiryDate);

		// Set SecurityContext
		Authentication authentication = tokenProvider.getAuthentication(authToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		System.out.println("Set up completed");
	}

	@Test
	void createPost() throws Exception {
		PostCreateRequest request = new PostCreateRequest("Test Title", "Test Content");

		MockMultipartFile jsonFile = new MockMultipartFile("data", "", "application/json",
			objectMapper.writeValueAsBytes(request));

		// Create fake image content
		byte[] imageContent = "fake image content".getBytes();
		MockMultipartFile imageFile = new MockMultipartFile("images", "image.jpg", "image/jpeg", imageContent);

		mockMvc.perform(MockMvcRequestBuilders.multipart("/api/v1/community/posts")
				.file(jsonFile)
				.file(imageFile)
				.contentType(MediaType.MULTIPART_FORM_DATA)
				.accept(MediaType.APPLICATION_JSON)
				.header("Authorization", "Bearer " + authToken.getToken())) // Add JWT token
			.andExpect(status().isOk());

		Mockito.verify(communityService, Mockito.times(1))
			.createPost(Mockito.any(Member.class), Mockito.any(PostCreateRequest.class), Mockito.anyList());
	}
}
