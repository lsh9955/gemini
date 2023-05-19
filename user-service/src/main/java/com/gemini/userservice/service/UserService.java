// UserService interface
package com.gemini.userservice.service;

import com.gemini.userservice.dto.request.RequestFollowDto;
import com.gemini.userservice.dto.UpdateProfileRequestDto;
import com.gemini.userservice.dto.UserDto;

public interface UserService {
    void enrollUser(UserDto userDto);

    void updateProfile(UpdateProfileRequestDto requestDto, String username);

    String followUser(String currentUsername, RequestFollowDto requestFollowDto);

    void unfollowUser(String currentUsername, RequestFollowDto requestFollowDto);



}
