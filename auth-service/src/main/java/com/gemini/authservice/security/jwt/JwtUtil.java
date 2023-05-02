package com.gemini.authservice.security.jwt;

import com.gemini.authservice.config.auth.PrincipalDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;


@ConfigurationProperties(prefix = "jwt")
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    public long getRefreshTokenExpiration() {
        return refreshTokenExpiration;
    }

    // 😀 gotta inspect if using .getId(); method directly is ok. rather than "Long userId = principalDetails.getUser().getId();"
    public String generateAccessToken(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String username = principalDetails.getUsername();
        System.out.println("엑세스토큰 발급했다!");
        return generateToken(username, accessTokenExpiration);
    }

    public String generateRefreshToken(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String username = principalDetails.getUsername();
        System.out.println("refreshToken발급했다!");
        return generateToken(username, refreshTokenExpiration);
    }

    private String generateToken(String username , long expiration) {
        return Jwts.builder()
                .setSubject(String.valueOf(username))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }


    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            System.out.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = getClaims(token);
        return Long.parseLong(claims.getSubject());
    }

    public String validateTokenAndGetUsername(String token) {
        try {
            System.out.println("토큰: " + token);
            Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
            System.out.println("claims:" + claims);
            System.out.println("claims.getSubject:" + claims.getSubject());
            return claims.getSubject();
        } catch (Exception e) {
            return null;
        }
    }
}