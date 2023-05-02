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


    @PostMapping // test complete 😀 exception for following myself needed, duplicated request also should be handled.
    public ResponseEntity<Void> followUser(@RequestHeader("username") String currentUsername, @RequestBody FollowRequestDto followRequestDto) {
        System.out.println("follow test start@@@@@@@@@@@@@@@@@@@@");
        userService.followUser(currentUsername, followRequestDto);
        System.out.println(currentUsername);
        System.out.println(followRequestDto);
        System.out.println("follow success");
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{userId}") // test complete 😀
    public ResponseEntity<Void> unfollowUser(
            @RequestHeader("username") String currentUsername,
            @PathVariable("userId") Long userPkToUnfollow) {
        System.out.println("unfollow test start@@@@@@@@@@@@@@@@@@@@");

        System.out.println("currentUsername"+ currentUsername);
        System.out.println("userPkToUnfollow: "+ userPkToUnfollow);

        userService.unfollowUser(currentUsername, userPkToUnfollow);
        System.out.println("unfollow success");
        return ResponseEntity.noContent().build();
    }


    @PatchMapping // test complete 😀
    public ResponseEntity<Void> updateProfile(@RequestBody UpdateProfileRequestDto requestDto, @RequestHeader("username") String username) {
        System.out.println("update my profile start@@@@@@@@@@@@@@@@@");
        userService.updateProfile(requestDto, username);
        System.out.println("update my profile success!!!!!!!!!!!!!!");
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/login") // test complete 😀
    public ResponseEntity<UserInfoDto> getUserProfile(@RequestHeader("username") String username) {
        UserInfoDto userInfoDto = userInfoService.getUserInfoByUsername(username);
        return ResponseEntity.ok(userInfoDto);
    }

    @PostMapping("/enroll") // test complete 😀
    public ResponseEntity<String> enrollUser(@RequestBody UserDto userDto) {
        System.out.println("======================@@@@@@@@@@@@@@@@user_service enroll start======================@@@@@@@@@@@@@@@@");
        System.out.println(userDto);
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
    @PostMapping("/checkNickname") // test complete 😀
    public ResponseEntity<NicknameCheckResponseDto> checkNickname(@RequestBody NicknameCheckRequestDto requestDto) {
        boolean isDuplicated = userInfoService.isNicknameDuplicated(requestDto.getNickname());
        return ResponseEntity.ok(NicknameCheckResponseDto.builder().duplicated(isDuplicated).nickname(requestDto.getNickname()).build());
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<OtherUserProfileResponseDto> getOtherUserProfile(@PathVariable String nickname) {
        OtherUserProfileResponseDto otherUserProfileDto = userInfoService.getOtherUserProfile(nickname);
        return ResponseEntity.ok(otherUserProfileDto);
    }

}
