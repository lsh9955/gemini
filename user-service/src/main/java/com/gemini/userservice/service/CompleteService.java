package com.gemini.userservice.service;

import com.gemini.userservice.dto.ML.RequestCompleteBackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.ML.RequestCompletePoseDto;

import java.util.List;

public interface CompleteService {

    Long completeGemini(RequestCompleteGeminiDto requestCompleteGeminiDto);

    String completeBackground(RequestCompleteBackgroundDto requestCompleteBackgroundDto);

    List<String> completePose(RequestCompletePoseDto requestCompletePoseDto);

    String checkBackground(String imageUrl);
}
