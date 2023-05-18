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

    Long getGalleryToGeminiNo(Long galleryNo);

    ResponseDefaultDto getDefault(Long geminiNo);

    ResponseTagDto getTag(Long tagId);

    Integer getStar(String username);



    ResponseGenerateGeminiDto generateGemini(RequestGenerateGeminiDto requestGenerateGeminiDto, String username);

    ResponseGetAllBackgroundDto getAllBackgrounds();

    BackgroundDto getBackground(Long backgroundNo);

    String generateBackground(String username, String background);

    ResponseGetAllPoseDto getAllPoses(String username);

    PoseDto getPose(Long poseNo);

    ResponseGeneratePoseDto generatePose(RequestGeneratePoseDto requestGeneratePoseDto);


}
