package com.gemini.userservice.service;

import com.gemini.userservice.dto.OtherUserProfileResponseDto;
import com.gemini.userservice.dto.UserInfoDto;
import com.gemini.userservice.dto.request.RequestSelectPairchildDto;
import com.gemini.userservice.dto.response.ResponseFollowCountDto;

public interface UserInfoService {
    UserInfoDto getUserInfoByUsername(String username);
    boolean isNicknameDuplicated(String nickname);

    UserInfoDto getUserInfoByUserPk(Long userPk);

    OtherUserProfileResponseDto getOtherUserProfile(String username, String nickname);

    UserInfoDto selectPairchild(String username, RequestSelectPairchildDto selectGeminiDto);

    ResponseFollowCountDto getFollowCounts(String nickname);

    String updateProfileImage(String username, Long geminiNo);
}
