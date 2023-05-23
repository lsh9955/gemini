package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;

import java.util.List;

public interface CustomGeminiRepository {
    List<Gemini> findByUserInfoAndIsPublic(UserInfo userInfo, boolean isPublic);
}
