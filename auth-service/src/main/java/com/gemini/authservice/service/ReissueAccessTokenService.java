package com.gemini.authservice.service;

import org.springframework.security.core.Authentication;

public interface ReissueAccessTokenService {
    Authentication getAuthenticationFromUsername(String username);
    String generateAccessTokenFromUsername(String username);
}