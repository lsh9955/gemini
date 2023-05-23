package com.gemini.authservice.api;

import com.gemini.authservice.dto.AccessTokenResponse;
import com.gemini.authservice.security.jwt.JwtUtil;
import com.gemini.authservice.service.ReissueAccessTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthApiController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ReissueAccessTokenService reissueAccessTokenService;

    @GetMapping("/validate") // test complete 😀
    public ResponseEntity<?> validateToken(@RequestHeader(value="Authorization", required = false) String token) {
        System.out.println("======================@@@@@@@@@@@token_valate start======================@@@@@");
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        System.out.println(token);
        String tokenWithoutBearer = token.replace("Bearer ", "");
        System.out.println(tokenWithoutBearer);
        String username = jwtUtil.validateTokenAndGetUsername(tokenWithoutBearer);
        System.out.println(username);
        if (username != null) {
            System.out.println("username != null not null!!!! got username!");
            System.out.println("username: "+ username);
            return ResponseEntity.ok().header("X-Username", username).build();
        } else {
            System.out.println("username == null @@@@@@@@@@@@@@@");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PostMapping("/reissue") // test complete 😀
    public ResponseEntity<?> refreshToken(@CookieValue(value = "Refresh-Token", required = false) String refreshToken, HttpServletResponse response) {
        System.out.println("token reisuue @@@@@@@@@@@@@@@");
        System.out.println(refreshToken);
        System.out.println(response);
        if (refreshToken == null || !jwtUtil.validateToken(refreshToken)) {
            System.out.println("token reisuue failed. refreshToken==null @@@@@@@@@@@@@@@");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = jwtUtil.validateTokenAndGetUsername(refreshToken);
        String accessToken = reissueAccessTokenService.generateAccessTokenFromUsername(username);
        // 이곳에서 userId를 이용해 사용자 정보를 검색하고 인증 객체를 생성해야 합니다.
        // 예를 들어, UserDetails를 로드하고 Authentication 객체를 생성하는 것과 같습니다.
        // 이 예제에서는 이러한 로직을 생략하고 직접 인증 객체를 만듭니다.
        response.setHeader("accessToken", accessToken);

        AccessTokenResponse accessTokenResponse = new AccessTokenResponse(accessToken);
        return ResponseEntity.ok(accessTokenResponse);
    }
}