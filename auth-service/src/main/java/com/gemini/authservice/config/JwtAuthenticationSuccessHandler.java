package com.gemini.authservice.config;

import com.gemini.authservice.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//public class JwtAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
public class JwtAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationSuccessHandler(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Value("${custom.react.redirect_uri}")
    private String reactRedirectUri;

//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
//                                        Authentication authResult) throws IOException, ServletException {
//
//        String accessToken = jwtUtil.generateAccessToken(authResult);
//        String refreshToken = jwtUtil.generateRefreshToken(authResult);
//
//        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@onAuthenticationSuccess");
//
//        // Create a new cookie and set the refresh token
//        Cookie refreshTokenCookie = new Cookie("Refresh-Token", refreshToken);
//        refreshTokenCookie.setHttpOnly(true);
//        refreshTokenCookie.setSecure(true); // Set this to 'true' only if using HTTPS 배포해서 HTTPS를 사용시, true로 변경😀
//        refreshTokenCookie.setPath("/");
//        refreshTokenCookie.setMaxAge(Integer.parseInt("${jwt.refresh-token-expiration}")); // 7 days yml setting
//
//        response.addHeader("Authorization", "Bearer " + accessToken);
//        response.addCookie(refreshTokenCookie);
////        super.setDefaultTargetUrl("http://localhost:3000/loginSuccess");
//        setDefaultTargetUrl("http://localhost:3000/loginSuccess");
//        super.onAuthenticationSuccess(request, response, authResult);
//    }
@Override
public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

    String accessToken = jwtUtil.generateAccessToken(authentication);
    String refreshToken = jwtUtil.generateRefreshToken(authentication);

    System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@onAuthenticationSuccess");

    // Create a new cookie and set the refresh token
    Cookie refreshTokenCookie = new Cookie("Refresh-Token", refreshToken);
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setSecure(true); // Set this to 'true' only if using HTTPS 배포해서 HTTPS를 사용시, true로 변경😀
    refreshTokenCookie.setPath("/"); // needs to inspect 😀
//    refreshTokenCookie.setMaxAge(Integer.parseInt("${jwt.refresh-token-expiration}")); // 7 days yml setting
    refreshTokenCookie.setMaxAge((int) jwtUtil.getRefreshTokenExpiration() / 1000); // expiration is in milliseconds, converting it to seconds

    response.addHeader("Authorization", "Bearer " + accessToken);
    response.addCookie(refreshTokenCookie);
    setDefaultTargetUrl(reactRedirectUri);
//    setDefaultTargetUrl("http://localhost:3000/loginSuccess");
    super.onAuthenticationSuccess(request, response, authentication); // test success 😀
}
}