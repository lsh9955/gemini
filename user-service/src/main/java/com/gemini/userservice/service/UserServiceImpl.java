// UserService implementation
package com.gemini.userservice.service;

import com.gemini.userservice.dto.request.RequestFollowDto;
import com.gemini.userservice.dto.UpdateProfileRequestDto;
import com.gemini.userservice.dto.UserDto;
import com.gemini.userservice.entity.Follow;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.FollowRepository;
import com.gemini.userservice.repository.UserInfoRepository;
import com.gemini.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private FollowRepository followRepository;

    @Override
    public void enrollUser(UserDto userDto) {
        UserInfo userInfo = UserInfo.builder()
                .username(userDto.getUsername())
                .description(null)
                .nickname(null)
                .profileBackgroundUrl(null)
                .star(10)
                .build();

        userRepository.save(userInfo);
    }

//    @Override
//    public void updateProfile(UpdateProfileRequestDto requestDto, String username) {
//        UserInfo userInfo = userInfoRepository.findByUsername(username);
//        if (requestDto.getDescription() != null) {
//            userInfo.setDescription(requestDto.getDescription());
//        }
//        if (requestDto.getNickname() != null) {
//            userInfo.setNickname(requestDto.getNickname());
//        }
//        if (requestDto.getProfileBackground() != null) {
//            userInfo.setProfileBackground(requestDto.getProfileBackground());
//        }
//        userInfoRepository.save(userInfo);
//    }

    @Override
    public void updateProfile(UpdateProfileRequestDto requestDto, String username) {
        UserInfo userInfo = userInfoRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println("updateprofile method start@@@@@@@@@@@@@");
        System.out.println("requestDto: "+ requestDto);

        if (requestDto.getDescription() != null) {
            userInfo.setDescription(requestDto.getDescription());
        }
        if (requestDto.getNickname() != null) {
            userInfo.setNickname(requestDto.getNickname());
        }
        if (requestDto.getProfileBackground() != null) {
            userInfo.setProfileBackgroundUrl(requestDto.getProfileBackground());
        }
        System.out.println("userInfo result@@@@@@@@@@@@@@@@@@@@@@");
        System.out.println("userInfo:" + userInfo);
        System.out.println("return으로 뭔가 body에 민감하지 않은 정보들이라도 보여주는게 좋을지?");
        userInfoRepository.save(userInfo);
    }

    @Override
    public String followUser(String currentUsername, RequestFollowDto requestFollowDto) {

        UserInfo follower = userInfoRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
        UserInfo following = userInfoRepository.findByNickname(requestFollowDto.getNickname())
                .orElseThrow(() -> new RuntimeException("User to follow not found"));
        if (follower != following) {
            Optional<Follow> isFollowed = followRepository.findByFollowerAndFollowing(follower, following);
            if (!isFollowed.isPresent()) {
                Follow follow = Follow.builder()
                        .follower(follower)
                        .following(following)
                        .build();
                followRepository.save(follow);
                return "follow";
            }
        }
        return null;
    }

    @Override
    public void unfollowUser(String currentUsername, RequestFollowDto requestFollowDto) {
        UserInfo follower = userInfoRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
        UserInfo following = userInfoRepository.findByNickname(requestFollowDto.getNickname())
                .orElseThrow(() -> new RuntimeException("User to unfollow not found"));

        if (follower != following) {
            Optional<Follow> isFollowed = followRepository.findByFollowerAndFollowing(follower, following);
            if (isFollowed.isPresent()) {
                followRepository.delete(isFollowed.get());
            }
        }
    }
}
