package com.gemini.userservice.api;

import com.gemini.userservice.dto.UserDto;
import com.gemini.userservice.dto.UserInfoDto;
import com.gemini.userservice.service.UserInfoService;
import com.gemini.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user-service/profile")
public class UserInfoApiController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserInfoService userInfoService;

    @PostMapping("/enroll")
    public ResponseEntity<String> enrollUser(@RequestBody UserDto userDto) {
        userService.enrollUser(userDto);
        return ResponseEntity.ok("success");
    }

    @GetMapping
    public ResponseEntity<UserInfoDto> getUserProfile(HttpServletRequest request) {
        String username = request.getHeader("username");
        UserInfoDto userInfoDto = userInfoService.getUserInfoByUsername(username);
        return ResponseEntity.ok(userInfoDto);
    }

}
