package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomGeminiRepository {
    List<Gemini> findByUserInfoAndIsPublic(UserInfo userInfo, boolean isPublic);
}
