package com.gemini.userservice.api;

import com.gemini.userservice.dto.*;

import com.gemini.userservice.dto.request.RequestFollowDto;
import com.gemini.userservice.dto.request.RequestNicknameDto;
import com.gemini.userservice.dto.request.RequestSelectPairchildDto;

import com.gemini.userservice.dto.Alarm.FollowAlarmDto;
import com.gemini.userservice.dto.response.ResponseFollowCountDto;
import com.gemini.userservice.repository.GeminiRepository;
import com.gemini.userservice.service.AlarmService;
import com.gemini.userservice.service.EmitterService;

import com.gemini.userservice.service.UserInfoService;
import com.gemini.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

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

    @Autowired
    private GeminiRepository geminiRepository;


    //  X-Username으로 모두 변경 필요. 로컬 테스트 끝나고. 😀
    @PostMapping("/select-pairchild")
    public ResponseEntity<UserInfoDto> selectGemini(@RequestHeader("X-Username") String username, @RequestBody RequestSelectPairchildDto selectGeminiDto) {
        UserInfoDto updatedUserInfo = userInfoService.selectPairchild(username, selectGeminiDto);
        return ResponseEntity.status(201).body(updatedUserInfo);
    }

    @PostMapping // test complete 😀 exception for following myself needed, duplicated request also should be handled.
    public ResponseEntity<Void> followUser(@RequestHeader("X-Username") String currentUsername, @RequestBody RequestFollowDto requestFollowDto) throws IOException, InterruptedException {

        String res = userService.followUser(currentUsername, requestFollowDto);

        if (res == "follow") {
            //알람 메세지를 만들기 위해 FollowAlarmDto에 넣어준다.
            FollowAlarmDto followAlarmDto = new FollowAlarmDto();
            //알람을 얻는 사람 => 즉 팔로우를 당한 사람 => 여기에 알람을 보내준다!! (팔로우를 보내는 사람의 닉네임을 저장한다)
            followAlarmDto.setGetAlarmNickName(requestFollowDto.getNickname()); // nickname도 고유한거라서 닉네임을 보내준다. 😥 이게 진짜에요.
            //알람을 보내는 사람 => 팔로우 한 사람
            followAlarmDto.setSendAlarmUserName(currentUsername);
            alarmService.createFollowAlarm(currentUsername, followAlarmDto);
        }

        return ResponseEntity.ok().build();
    }


    @DeleteMapping // test complete 😀
    public ResponseEntity<Void> unfollowUser(
            @RequestHeader("X-Username") String currentUsername,
            @RequestBody RequestFollowDto requestFollowDto) {
        System.out.println("unfollow test start@@@@@@@@@@@@@@@@@@@@");

        System.out.println("currentUsername"+ currentUsername);
        System.out.println("userPkToUnfollow: "+ requestFollowDto.toString());

        userService.unfollowUser(currentUsername, requestFollowDto);
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

    @PostMapping("/followcount")
    public ResponseEntity<ResponseFollowCountDto> getFollowCounts(@RequestBody RequestNicknameDto requestNicknameDto) {
        ResponseFollowCountDto followCountDTO = userInfoService.getFollowCounts(requestNicknameDto.getNickname());
        return ResponseEntity.ok(followCountDTO);
    }



    @PostMapping("/checkNickname") // test complete 😀
    public ResponseEntity<NicknameCheckResponseDto> checkNickname(@RequestBody NicknameCheckRequestDto requestDto) {
        boolean isDuplicated = userInfoService.isNicknameDuplicated(requestDto.getNickname());
        return ResponseEntity.ok(NicknameCheckResponseDto.builder().duplicated(isDuplicated).nickname(requestDto.getNickname()).build());
    }

    @GetMapping("/{nickname}") // test complete 😀
    public ResponseEntity<OtherUserProfileResponseDto> getOtherUserProfile(@RequestHeader("X-Username") String username, @PathVariable String nickname) {
        OtherUserProfileResponseDto otherUserProfileDto = userInfoService.getOtherUserProfile(username, nickname);
        return ResponseEntity.ok(otherUserProfileDto);
    }

    @PostMapping("/profileImage")
    public ResponseEntity<String> updateProfileImage(@RequestHeader("X-Username") String username,
                                                                       @RequestBody Map<String, Long> geminiMap) {

        Long geminiNo = geminiMap.get("geminiPk");
        String res = userInfoService.updateProfileImage(username, geminiNo);
        if (res == null) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(res);
    }

}
