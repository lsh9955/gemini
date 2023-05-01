package com.gemini.userservice.api;

import com.gemini.userservice.dto.NicknameCheckDto;
import com.gemini.userservice.dto.OtherUserProfileResponseDto;
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

    @GetMapping("/login")
    public ResponseEntity<UserInfoDto> getUserProfile(HttpServletRequest request) {
        String username = request.getHeader("username");
        UserInfoDto userInfoDto = userInfoService.getUserInfoByUsername(username);
        return ResponseEntity.ok(userInfoDto);
    }

    @PostMapping("/enroll")
    public ResponseEntity<String> enrollUser(@RequestBody UserDto userDto) {
        System.out.println("======================@@@@@@@@@@@@@@@@user_service enroll start======================@@@@@@@@@@@@@@@@");
        userService.enrollUser(userDto);
        System.out.println("======================@@@@@@@@@@@@@@@@user_service enroll done======================@@@@@@@@@@@@@@@@");
        return ResponseEntity.ok("success");
    }

    @PostMapping("/checkNickname")
    public ResponseEntity<NicknameCheckDto> checkNickname(@RequestBody NicknameCheckDto requestDto) {
        boolean isDuplicated = userInfoService.isNicknameDuplicated(requestDto.getNickname());
        return ResponseEntity.ok(NicknameCheckDto.builder().duplicated(isDuplicated).build());
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<OtherUserProfileResponseDto> getOtherUserProfile(@PathVariable String nickname) {
        OtherUserProfileResponseDto otherUserProfileDto = userInfoService.getOtherUserProfile(nickname);
        return ResponseEntity.ok(otherUserProfileDto);
    }

}
