package com.gemini.userservice.api;

import com.gemini.userservice.dto.*;

import com.gemini.userservice.dto.request.RequestSelectPairchildDto;

import com.gemini.userservice.dto.Alarm.FollowAlarmDto;
import com.gemini.userservice.dto.response.ResponseAlarmDto;
import com.gemini.userservice.dto.response.ResponseOrdersDto;
import com.gemini.userservice.service.AlarmService;
import com.gemini.userservice.service.EmitterService;

import com.gemini.userservice.service.UserInfoService;
import com.gemini.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/user-service/profile")
public class UserInfoApiController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private AlarmService alarmService;

    @Autowired
    private EmitterService emitterService;


    //  X-Username으로 모두 변경 필요. 로컬 테스트 끝나고. 😀
    @PostMapping("/select-pairchild")
    public ResponseEntity<UserInfoDto> selectGemini(@RequestHeader("X-Username") String username, @RequestBody RequestSelectPairchildDto selectGeminiDto) {
        UserInfoDto updatedUserInfo = userInfoService.selectPairchild(username, selectGeminiDto);
        return ResponseEntity.status(201).body(updatedUserInfo);
    }


    @PostMapping // test complete 😀 exception for following myself needed, duplicated request also should be handled.
    public ResponseEntity<Void> followUser(@RequestHeader("X-Username") String currentUsername, @RequestBody FollowRequestDto followRequestDto) {
        System.out.println("follow test start@@@@@@@@@@@@@@@@@@@@");
//        System.out.println(currentUsername);
//        System.out.println(followRequestDto);
        System.out.println("follow success");
        SseEmitter emitter = new SseEmitter();
        emitterService.addEmitter(emitter);

        try {
            userService.followUser(currentUsername, followRequestDto);
            //알람 메세지를 만들기 위해 FollowAlarmDto에 넣어준다.
            FollowAlarmDto followAlarmDto = new FollowAlarmDto();
            //알람을 얻는 사람 => 즉 팔로우를 당한 사람 => 여기에 알람을 보내준다!!
            followAlarmDto.setGetAlarmPk(followRequestDto.getUserPk());
            //알람을 보내는 사람 => 팔로우 한 사람
            followAlarmDto.setSendAlarmUserName(currentUsername);

            // 팔로우 알림 생성
            alarmService.createFollowAlarm(currentUsername, followAlarmDto, emitter);

            emitter.send(SseEmitter.event().name("COMPLETE").data("SUCCESS")); // success message
        } catch (Exception e) {
            emitter.send(SseEmitter.event().name("ERROR").data(e.getMessage())); // error message
        } finally {
            emitter.complete(); // complete emitter
            emitterService.removeEmitter(emitter); // remove emitter from emitterService
        }


        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{userId}") // test complete 😀
    public ResponseEntity<Void> unfollowUser(
            @RequestHeader("X-Username") String currentUsername,
            @PathVariable("userId") Long userPkToUnfollow) {
        System.out.println("unfollow test start@@@@@@@@@@@@@@@@@@@@");

        System.out.println("currentUsername"+ currentUsername);
        System.out.println("userPkToUnfollow: "+ userPkToUnfollow);

        userService.unfollowUser(currentUsername, userPkToUnfollow);
        System.out.println("unfollow success");
        return ResponseEntity.noContent().build();
    }


    @PatchMapping // test complete 😀
    public ResponseEntity<Void> updateProfile(@RequestBody UpdateProfileRequestDto requestDto, @RequestHeader("X-Username") String username) {
        System.out.println("update my profile start@@@@@@@@@@@@@@@@@");
        userService.updateProfile(requestDto, username);
        System.out.println("update my profile success!!!!!!!!!!!!!!");
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/login") // test complete 😀
    public ResponseEntity<UserInfoDto> getUserProfile(@RequestHeader("X-Username") String username) {
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


    @PostMapping("/checkNickname") // test complete 😀
    public ResponseEntity<NicknameCheckResponseDto> checkNickname(@RequestBody NicknameCheckRequestDto requestDto) {
        boolean isDuplicated = userInfoService.isNicknameDuplicated(requestDto.getNickname());
        return ResponseEntity.ok(NicknameCheckResponseDto.builder().duplicated(isDuplicated).nickname(requestDto.getNickname()).build());
    }

    @GetMapping("/{nickname}") // test complete 😀
    public ResponseEntity<OtherUserProfileResponseDto> getOtherUserProfile(@PathVariable String nickname) {
        OtherUserProfileResponseDto otherUserProfileDto = userInfoService.getOtherUserProfile(nickname);
        return ResponseEntity.ok(otherUserProfileDto);
    }

}
