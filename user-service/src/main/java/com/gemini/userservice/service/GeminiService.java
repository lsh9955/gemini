package com.gemini.userservice.service;

import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseTagDto;

public interface GeminiService {

    ResponseTagDto getTag(Long tagId);

    String generateGemini(RequestGenerateGeminiDto requestGenerateGeminiDto, String username);
}
