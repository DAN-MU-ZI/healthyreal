package com.healthyreal.be.oauth.exception;

public class TokenValidFailedException extends RuntimeException {
	public TokenValidFailedException() {
		super("Filed to generate Token.");
	}
}
