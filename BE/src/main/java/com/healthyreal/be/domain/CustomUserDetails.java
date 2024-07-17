package com.healthyreal.be.domain;

import java.util.Collection;
import java.util.Collections;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails implements UserDetails {
	@Getter
	private final Member member;
	private final Collection<? extends GrantedAuthority> authorities;

	public CustomUserDetails(final Member member) {
		this.member = member;
		this.authorities = Collections.singleton(new SimpleGrantedAuthority(member.getRoleType().getCode()));
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return member.getUsername();
	}
}
