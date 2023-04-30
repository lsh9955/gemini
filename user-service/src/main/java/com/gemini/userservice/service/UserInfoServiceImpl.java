package com.gemini.userservice.service;

import com.gemini.userservice.dto.UserInfoDto;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserInfoDto getUserInfoByUsername(String username) {
        UserInfo userInfo = userRepository.findByUsername(username);
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