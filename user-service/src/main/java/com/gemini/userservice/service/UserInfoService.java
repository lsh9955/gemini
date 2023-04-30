package com.gemini.userservice.service;

import com.gemini.userservice.dto.UserInfoDto;

public interface UserInfoService {
    UserInfoDto getUserInfoByUsername(String username);
}
