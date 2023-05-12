package com.gemini.userservice.service;

import com.gemini.userservice.dto.request.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseTagDto;

public interface GeminiService {

    ResponseTagDto getTag(Long tagId);

    Integer getStar(String username);

    Long completeGemini(RequestCompleteGeminiDto requestCompleteGeminiDto);

    ResponseGenerateGeminiDto generateGemini(RequestGenerateGeminiDto requestGenerateGeminiDto, String username);
}
