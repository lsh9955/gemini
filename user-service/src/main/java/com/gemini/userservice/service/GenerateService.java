package com.gemini.userservice.service;

import com.gemini.userservice.dto.BackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompleteBackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompletePoseDto;
import com.gemini.userservice.dto.PoseDto;
import com.gemini.userservice.dto.ML.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.request.RequestGeneratePoseDto;
import com.gemini.userservice.dto.response.*;

import java.util.List;

public interface GenerateService {

    ResponseDefaultDto getDefault(Long galleryNo);

    ResponseTagDto getTag(Long tagId);

    Integer getStar(String username);

    Long completeGemini(RequestCompleteGeminiDto requestCompleteGeminiDto);

    ResponseGenerateGeminiDto generateGemini(RequestGenerateGeminiDto requestGenerateGeminiDto, String username);

    ResponseGetAllBackgroundDto getAllBackgrounds();

    BackgroundDto getBackground(Long backgroundNo);

    String generateBackground(String background);

    String completeBackground(RequestCompleteBackgroundDto requestCompleteBackgroundDto);

    ResponseGetAllPoseDto getAllPoses(String username);

    PoseDto getPose(Long poseNo);

    List<String> generatePose(RequestGeneratePoseDto requestGeneratePoseDto);

    List<String> completePose(RequestCompletePoseDto requestCompletePoseDto);
}
