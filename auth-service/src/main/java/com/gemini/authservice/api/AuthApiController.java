package com.gemini.authservice.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
//@Api(tags = "메인페이지 관련 API")
public class AuthApiController {


    @GetMapping("/check")
    public ResponseEntity<?> getMemberInfo(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        // fetching Token from Header
        String accessToken = request.getHeader("accessToken");

    }

//    @GetMapping("/reIssue")
//    public ResponseEntity<?> reIssueToken(HttpServletRequest request) { return null; };
//
//    @GetMapping("/reIssue")
//    public ResponseEntity<?> reIssueToken(HttpServletRequest request) { return null; };
//
//    @GetMapping("/reIssue")
//    public ResponseEntity<?> reIssueToken(HttpServletRequest request) { return null; };



}
