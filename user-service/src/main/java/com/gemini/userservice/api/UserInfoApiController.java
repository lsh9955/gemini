package com.gemini.userservice.api;

import com.gemini.userservice.dto.UserDto;
import com.gemini.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserInfoApiController {

    @Autowired
    private UserService userService;

    @PostMapping("/user-service/profile/enroll")
    public ResponseEntity<String> enrollUser(@RequestBody UserDto userDto) {
        userService.enrollUser(userDto);
        return ResponseEntity.ok("success");
    }
}
