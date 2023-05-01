// UserService implementation
package com.gemini.userservice.service;

import com.gemini.userservice.dto.UpdateProfileRequestDto;
import com.gemini.userservice.dto.UserDto;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.UserInfoRepository;
import com.gemini.userservice.repository.UserRepository;
import com.gemini.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public void enrollUser(UserDto userDto) {
        UserInfo userInfo = UserInfo.builder()
                .username(userDto.getUsername())
                .description(null)
                .nickname(null)
                .profileBackground(null)
                .star(10)
                .build();

        userRepository.save(userInfo);
    }

    @Override
    public void updateProfile(UpdateProfileRequestDto requestDto, String username) {
        UserInfo userInfo = userInfoRepository.findByUsername(username);
        if (requestDto.getDescription() != null) {
            userInfo.setDescription(requestDto.getDescription());
        }
        if (requestDto.getNickname() != null) {
            userInfo.setNickname(requestDto.getNickname());
        }
        if (requestDto.getProfileBackground() != null) {
            userInfo.setProfileBackground(requestDto.getProfileBackground());
        }
        userInfoRepository.save(userInfo);
    }
}
