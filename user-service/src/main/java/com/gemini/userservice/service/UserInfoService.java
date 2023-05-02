package com.gemini.userservice.service;

import com.gemini.userservice.dto.OtherUserProfileResponseDto;
import com.gemini.userservice.dto.UserInfoDto;

public interface UserInfoService {
    UserInfoDto getUserInfoByUsername(String username);
    boolean isNicknameDuplicated(String nickname);

    UserInfoDto getUserInfoByUserPk(Long userPk);

    OtherUserProfileResponseDto getOtherUserProfile(String nickname);
}
