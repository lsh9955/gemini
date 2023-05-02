package com.gemini.userservice.service;

import com.gemini.userservice.dto.GeminiDto;
import com.gemini.userservice.dto.OtherUserProfileResponseDto;
import com.gemini.userservice.dto.UserInfoDto;
import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.FollowRepository;
import com.gemini.userservice.repository.GeminiRepository;
import com.gemini.userservice.repository.UserInfoRepository;
import com.gemini.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private GeminiRepository geminiRepository;
    @Autowired
    private FollowRepository followRepository;

    @Override
    public UserInfoDto getUserInfoByUserPk(Long userPk) {
        UserInfo userInfo = userRepository.findById(userPk)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserInfoDto.builder()
                .userPk(userInfo.getUserPk())
                .description(userInfo.getDescription())
                .nickname(userInfo.getNickname())
                .profileBackground(userInfo.getProfileBackground())
                .star(userInfo.getStar())
                .username(userInfo.getUsername())
                .build();
    }


    public boolean isNicknameDuplicated(String nickname) {
        Optional<UserInfo> userInfoOptional = userRepository.findByNickname(nickname);
        return userInfoOptional.isPresent();
    }


    @Override
    public OtherUserProfileResponseDto getOtherUserProfile(String nickname) {

        UserInfo userInfo = userInfoRepository.findByNickname(nickname)
                .orElseThrow(() -> new RuntimeException("User not found"));;

        List<Gemini> publicGeminis = geminiRepository.findByUserInfoAndIsPublic(userInfo, true);

        List<GeminiDto> geminiDtos = publicGeminis.stream()
                .map(gemini -> GeminiDto.builder()
                        .geminiPk(gemini.getId())
                        .image(gemini.getImage())
                        .userPk(gemini.getUserInfo().getUserPk())
                        .build())
                .collect(Collectors.toList());
        System.out.println("제발기도해4");
        System.out.println(geminiDtos);

        long followerCount = followRepository.countByFollowing(userInfo);
        System.out.println("제발기도해5");
        System.out.println(followerCount);
        long followingCount = followRepository.countByFollower(userInfo);
        System.out.println("제발기도해6");
        return OtherUserProfileResponseDto.builder()
                .nickname(userInfo.getNickname())
                .description(userInfo.getDescription())
                .follower(followerCount)
//                .follower(1L)
                .following(followingCount)
//                .following(2L)
//                .star(userInfo.getStar()) // eliminated. watching other user's star is not allowed.
                .geminis(geminiDtos)
                .build();
    }

    @Override
    public UserInfoDto getUserInfoByUsername(String username) {
        UserInfo userInfo = userInfoRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserInfoDto.builder()
                .userPk(userInfo.getUserPk())
                .description(userInfo.getDescription())
                .nickname(userInfo.getNickname())
                .profileBackground(userInfo.getProfileBackground())
                .star(userInfo.getStar())
                .username(userInfo.getUsername())
                .build();
    }
}