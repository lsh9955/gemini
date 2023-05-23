package com.gemini.userservice.service;

import com.gemini.userservice.dto.GeminiDto;
import com.gemini.userservice.dto.OtherUserProfileResponseDto;
import com.gemini.userservice.dto.UserInfoDto;
import com.gemini.userservice.dto.request.RequestSelectPairchildDto;
import com.gemini.userservice.dto.response.ResponseFollowCountDto;
import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.FollowRepository;
import com.gemini.userservice.repository.GeminiRepository;
import com.gemini.userservice.repository.UserInfoRepository;
import com.gemini.userservice.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.transaction.annotation.Transactional;
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
                .profileBackground(userInfo.getProfileBackgroundUrl())
                .star(userInfo.getStar())
                .username(userInfo.getUsername())
                .build();
    }


    public boolean isNicknameDuplicated(String nickname) {
        Optional<UserInfo> userInfoOptional = userRepository.findByNickname(nickname);
        return userInfoOptional.isPresent();
    }


    @Transactional
    @Override
    public UserInfoDto selectPairchild(String username, RequestSelectPairchildDto requestSelectPairchildDto) {
        // 해당 사용자의 UserInfo 조회 (username으로 조회)
        UserInfo userInfo = userInfoRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        // 필드 업데이트
        userInfo.setNickname(requestSelectPairchildDto.getNickname());
        userInfo.setDescription(requestSelectPairchildDto.getDescription());
        userInfo.setProfileImgUrl(requestSelectPairchildDto.getProfile_img_url());

        // 변경 사항 저장
        UserInfo updatedUserInfo = userInfoRepository.save(userInfo);

        // UserInfoDto로 변환
        return UserInfoDto.builder()
                .userPk(updatedUserInfo.getUserPk())
                .nickname(updatedUserInfo.getNickname())
                .description(updatedUserInfo.getDescription())
                .profileBackground(updatedUserInfo.getProfileBackgroundUrl())
                .star(updatedUserInfo.getStar())
                .username(updatedUserInfo.getUsername())
                .profileImgUrl(updatedUserInfo.getProfileImgUrl())
                .build();
    }

    @Override
    public OtherUserProfileResponseDto getOtherUserProfile(String username, String nickname) {
        UserInfo visitingUserInfo = userInfoRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Visiting user not found"));

        UserInfo profileOwnerUserInfo = userInfoRepository.findByNickname(nickname)
                .orElseThrow(() -> new RuntimeException("Profile owner user not found"));


        List<Gemini> publicGeminis = geminiRepository.findByUserInfoAndIsPublic(profileOwnerUserInfo, true);

        List<GeminiDto> geminiDtos = publicGeminis.stream()
                .map(gemini -> GeminiDto.builder()
                        .geminiPk(gemini.getGeminiNo())
                        .image(gemini.getImageUrl())
                        .userPk(gemini.getUserInfo().getUserPk())
                        .build())
                .collect(Collectors.toList());
        System.out.println("제발기도해4");
        System.out.println(geminiDtos);

        long followerCount = followRepository.countByFollowing(profileOwnerUserInfo);
        System.out.println("제발기도해5");
        System.out.println(followerCount);
        long followingCount = followRepository.countByFollower(profileOwnerUserInfo);
        System.out.println("제발기도해6");
        boolean isFollowing = followRepository.findByFollowerAndFollowing(visitingUserInfo, profileOwnerUserInfo).isPresent();


        return OtherUserProfileResponseDto.builder()
                .nickname(profileOwnerUserInfo.getNickname())
                .description(profileOwnerUserInfo.getDescription())
                .follower(followerCount)
                .following(followingCount)
                .isFollowing(isFollowing) // 여기 추가정보를 넣어야함.
//                .star(userInfo.getStar()) // eliminated. watching other user's star is not allowed.
                .profileUrl(profileOwnerUserInfo.getProfileImgUrl())
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
                .profileBackground(userInfo.getProfileBackgroundUrl())
                .profileImgUrl(userInfo.getProfileImgUrl())
                .star(userInfo.getStar())
                .username(userInfo.getUsername())
                .build();
    }


    @Override
    public ResponseFollowCountDto getFollowCounts(String nickname) {
        UserInfo userInfo = userInfoRepository.findByNickname(nickname).orElseThrow(() -> new RuntimeException("User not found"));
        long followersCount = followRepository.countByFollowing(userInfo);
        long followingsCount = followRepository.countByFollower(userInfo);
        return new ResponseFollowCountDto(followersCount, followingsCount);
    }

    @Override
    public String updateProfileImage(String username, Long geminiNo) {

        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        if (!userInfo.isPresent()) {
            return null;
        }
        UserInfo user = userInfo.get();
        Gemini gemini = geminiRepository.findByGeminiNo(geminiNo);
        String imageUrl = gemini.getImageUrl();
        user.updateProfileImage(imageUrl);
        userInfoRepository.save(user);
        return imageUrl;
    }
}