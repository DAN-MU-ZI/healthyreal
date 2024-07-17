package com.healthyreal.be.service;

import com.healthyreal.be.domain.CustomUserDetails;
import com.healthyreal.be.domain.Member;
import com.healthyreal.be.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	private final MemberRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
		return null;
	}

	public CustomUserDetails loadUserById(final Long id) throws UsernameNotFoundException {
		Member member = userRepository.findById(id)
			.orElseThrow(() -> new UsernameNotFoundException("user not found"));
		return new CustomUserDetails(member);
	}
}
