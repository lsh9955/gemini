package com.gemini.authservice.service;


import com.gemini.authservice.config.auth.PrincipalDetails;
import com.gemini.authservice.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class ReissueAccessTokenServiceImpl implements ReissueAccessTokenService{

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Authentication getAuthenticationFromUsername(String username) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Override
    public String generateAccessTokenFromUsername(String username) {
        Authentication authentication = getAuthenticationFromUsername(username);
        return jwtUtil.generateAccessToken(authentication);
    }
}