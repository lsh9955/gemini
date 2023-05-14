package com.gemini.userservice.service;

import com.gemini.userservice.dto.BackgroundDto;
import com.gemini.userservice.dto.PoseDto;
import com.gemini.userservice.dto.request.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.request.RequestGeneratePoseDto;
import com.gemini.userservice.dto.response.ResponseGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseGetAllBackgroundDto;
import com.gemini.userservice.dto.response.ResponseGetAllPoseDto;
import com.gemini.userservice.dto.response.ResponseTagDto;

public interface GenerateService {

    ResponseTagDto getTag(Long tagId);

    Integer getStar(String username);

    Long completeGemini(RequestCompleteGeminiDto requestCompleteGeminiDto);

    ResponseGenerateGeminiDto generateGemini(RequestGenerateGeminiDto requestGenerateGeminiDto, String username);

    ResponseGetAllBackgroundDto getAllBackgrounds();

    BackgroundDto getBackground(Long backgroundNo);

    String generateBackground(String background);

    ResponseGetAllPoseDto getAllPoses(String username);

    PoseDto getPose(Long poseNo);

    String generatePose(RequestGeneratePoseDto requestGeneratePoseDto);
}
