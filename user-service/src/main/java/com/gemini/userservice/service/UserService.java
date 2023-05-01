// UserService interface
package com.gemini.userservice.service;

import com.gemini.userservice.dto.FollowRequestDto;
import com.gemini.userservice.dto.UpdateProfileRequestDto;
import com.gemini.userservice.dto.UserDto;

public interface UserService {
    void enrollUser(UserDto userDto);

    void updateProfile(UpdateProfileRequestDto requestDto, String username);

    void followUser(String currentUserId, FollowRequestDto followRequestDto);

    void unfollowUser(String currentUserId, String userIdToUnfollow);
}
