package com.gemini.userservice.service;

import com.gemini.userservice.dto.ProfileResponseDto;

public interface ProfileService {
    ProfileResponseDto getProfileByUsername(String username);
}