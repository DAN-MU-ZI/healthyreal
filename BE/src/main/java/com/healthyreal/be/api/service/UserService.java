package com.healthyreal.be.api.service;

import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;

	public Member getUser(String userId) {
		return userRepository.findByUserId(userId);
	}
}
