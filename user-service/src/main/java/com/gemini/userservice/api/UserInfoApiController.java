package com.gemini.userservice.api;

import com.gemini.userservice.dto.*;
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


    @PostMapping
    public ResponseEntity<Void> followUser(@RequestHeader("userId") String currentUserId, @RequestBody FollowRequestDto followRequestDto) {
        userService.followUser(currentUserId, followRequestDto);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> unfollowUser(
            @RequestHeader("userId") String currentUserId,
            @PathVariable("userId") String userIdToUnfollow) {

        userService.unfollowUser(currentUserId, userIdToUnfollow);
        return ResponseEntity.noContent().build();
    }


    @PatchMapping
    public ResponseEntity<Void> updateProfile(@RequestBody UpdateProfileRequestDto requestDto, @RequestHeader("userId") Long userPk) {
        userService.updateProfile(requestDto, userPk);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/login")
    public ResponseEntity<UserInfoDto> getUserProfile(@RequestHeader("userId") Long userPk) {
        UserInfoDto userInfoDto = userInfoService.getUserInfoByUserPk(userPk);
        return ResponseEntity.ok(userInfoDto);
    }

    @PostMapping("/enroll")
    public ResponseEntity<String> enrollUser(@RequestBody UserDto userDto) {
        System.out.println("======================@@@@@@@@@@@@@@@@user_service enroll start======================@@@@@@@@@@@@@@@@");
        userService.enrollUser(userDto);
        System.out.println("======================@@@@@@@@@@@@@@@@user_service enroll done======================@@@@@@@@@@@@@@@@");
        return ResponseEntity.ok("success");
    }

//    @PostMapping("/checkNickname")
//    public ResponseEntity<NicknameCheckDto> checkNickname(@RequestBody NicknameCheckDto requestDto) {
//        boolean isDuplicated = userInfoService.isNicknameDuplicated(requestDto.getNickname());
//        return ResponseEntity.ok(NicknameCheckDto.builder().duplicated(isDuplicated).build());
//    }

    //여기부터 다시 체크
    @PostMapping("/checkNickname")
    public ResponseEntity<NicknameCheckDto> checkNickname(@RequestBody NicknameCheckDto requestDto) {
        boolean isDuplicated = userInfoService.isNicknameDuplicated(requestDto.getNickname());
        return ResponseEntity.ok(NicknameCheckDto.builder().duplicated(isDuplicated).nickname(requestDto.getNickname()).build());
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<OtherUserProfileResponseDto> getOtherUserProfile(@PathVariable String nickname) {
        OtherUserProfileResponseDto otherUserProfileDto = userInfoService.getOtherUserProfile(nickname);
        return ResponseEntity.ok(otherUserProfileDto);
    }

}
