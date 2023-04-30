package com.gemini.userservice.api;

import com.gemini.userservice.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserInfoApiController {

    @PostMapping("/user-service/profile/enroll")
    public ResponseEntity<String> enrollUser(@RequestBody UserDto userDto) {
        // 사용자 등록 처리
        // userDto를 사용하여 사용자 정보를 저장하는 로직을 구현하세요.
        // 예를 들어, UserRepository를 사용하여 사용자 정보를 저장할 수 있습니다.

        return ResponseEntity.ok("success");
    }
}