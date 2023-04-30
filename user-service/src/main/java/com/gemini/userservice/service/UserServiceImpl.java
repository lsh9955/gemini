// UserService implementation
package com.gemini.userservice.service;

import com.gemini.userservice.dto.UserDto;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.UserRepository;
import com.gemini.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

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
}
