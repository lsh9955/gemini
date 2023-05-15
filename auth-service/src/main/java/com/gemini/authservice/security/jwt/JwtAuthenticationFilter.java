
package com.gemini.authservice.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gemini.authservice.config.auth.PrincipalDetails;
import com.gemini.authservice.dto.LoginRequestDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        try {
            LoginRequestDto loginRequest = new ObjectMapper().readValue(request.getInputStream(), LoginRequestDto.class);

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), loginRequest.getPassword());

            return authenticationManager.authenticate(authToken);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    // 😀 modification needed. we decided to locate RefreshToken in the Cookie. 😀
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        String accessToken = jwtUtil.generateAccessToken(authResult);
        String refreshToken = jwtUtil.generateRefreshToken(authResult);

        // Create a new cookie and set the refresh token
        Cookie refreshTokenCookie = new Cookie("Refresh-Token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true); // Set this to 'true' only if using HTTPS 배포해서 HTTPS를 사용시, true로 변경😀
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(Integer.parseInt("${jwt.refresh-token-expiration}")); // 7 days yml setting


        response.addHeader("Authorization", "Bearer " + accessToken);
//        response.addHeader("Refresh-Token", refreshToken);
        response.addCookie(refreshTokenCookie);
    }
}