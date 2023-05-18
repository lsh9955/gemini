package com.gemini.userservice.service;

import com.gemini.userservice.dto.ML.RequestCompleteBackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.ML.RequestCompletePoseDto;
import com.gemini.userservice.entity.*;
import com.gemini.userservice.repository.BackgroundRepository;
import com.gemini.userservice.repository.GeminiRepository;
import com.gemini.userservice.repository.PoseRepository;
import com.gemini.userservice.repository.UserPoseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompleteServiceImpl implements CompleteService{

    private final GeminiRepository geminiRepository;

    private final BackgroundRepository backgroundRepository;

    private final PoseRepository poseRepository;

    private final UserPoseRepository userPoseRepository;

    private final MongoTemplate mongoTemplate;



    @Override
    public Long completeGemini(RequestCompleteGeminiDto requestCompleteGeminiDto) {

        Gemini gemini = Gemini.builder()
                .imageUrl(requestCompleteGeminiDto.getImageUrl())
                .totalLike(0)
                .seed(requestCompleteGeminiDto.getSeed())
                .build();
        geminiRepository.save(gemini);
        GeminiTag geminiTag = GeminiTag.builder()
                .geminiNo(gemini.getGeminiNo())
                .tagIds(requestCompleteGeminiDto.getTagIds())
                .prompt(requestCompleteGeminiDto.getPrompt())
                .build();
        mongoTemplate.insert(geminiTag, "gemini_tag");
        return gemini.getGeminiNo();
    }

    @Override
    public String completeBackground(RequestCompleteBackgroundDto requestCompleteBackgroundDto) {

        Background background1 = Background.builder()
                .name(requestCompleteBackgroundDto.getKorean())
                .description(requestCompleteBackgroundDto.getDescription())
                .imageUrl(requestCompleteBackgroundDto.getImageUrl())
                .build();
        backgroundRepository.save(background1);
        return background1.getImageUrl();
    }

    @Override
    public List<String> completePose(RequestCompletePoseDto requestCompletePoseDto) {

        Pose pose = Pose.builder().
                build();
        poseRepository.save(pose);
        Long poseNo = pose.getPoseNo();
        List<String> imageUrls = requestCompletePoseDto.getImageUrls();
        List<Long> geminis = requestCompletePoseDto.getGeminis();
        PoseImage poseImage = PoseImage.builder()
                .poseNo(poseNo)
                .background(requestCompletePoseDto.getBackgroundUrl())
                .images(imageUrls)
                .build();
        mongoTemplate.insert(poseImage, "pose_image");
        for(Long geminiNo : geminis) {
            Gemini gemini = geminiRepository.findByGeminiNo(geminiNo);
            UserInfo userInfo = gemini.getUserInfo();
            UserPose userPose = UserPose.builder()
                    .pose(pose)
                    .userInfo(userInfo)
                    .build();
            userPoseRepository.save(userPose);
        }

        return imageUrls;
    }

    @Override
    public String checkBackground(String imageUrl) {

        Optional<Background> background = backgroundRepository.findByImageUrl(imageUrl);
        if (background.isPresent()) {
            return "ok";
        }
        return "fail";
    }
}
