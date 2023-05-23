package com.gemini.userservice.service;

import com.gemini.userservice.dto.*;
import com.gemini.userservice.dto.ML.RequestCompleteBackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.ML.RequestCompletePoseDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.request.RequestGeneratePoseDto;
import com.gemini.userservice.dto.response.*;
import com.gemini.userservice.entity.*;
import com.gemini.userservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class GenerateServiceImpl implements GenerateService {

    private final TagRepository tagRepository;

    private final RestTemplate restTemplate;

    private final MongoTemplate mongoTemplate;

    private final Environment env;

    private final UserInfoRepository userInfoRepository;

    private final CategoryRepository categoryRepository;

    private final GeminiRepository geminiRepository;

    private final BackgroundRepository backgroundRepository;

    private final UserPoseRepository userPoseRepository;

    private final PoseRepository poseRepository;

    private final GalleryRepository galleryRepository;


    @Override
    public Long getGalleryToGeminiNo(Long galleryNo) {

        Gallery gallery = galleryRepository.findByGalleryNo(galleryNo);
        Gemini gemini = gallery.getGemini();
        Long geminiNo = gemini.getGeminiNo();
        return geminiNo;
    }

    @Override
    public ResponseDefaultDto getDefault(Long geminiNo) {

        Gemini gemini = geminiRepository.findByGeminiNo(geminiNo);
        GeminiTag geminiTag = mongoTemplate.findOne(
                Query.query(Criteria.where("geminiNo").is(gemini.getGeminiNo())),
                GeminiTag.class
        );
        List<Long> tags = geminiTag.getTagIds();
        List<TagDto> res = new ArrayList<>();
        for(Long tag: tags) {
            Tag tagEntity = tagRepository.findByTagNo(tag);
            TagDto tagDto = new TagDto(tagEntity);
            res.add(tagDto);
        }
        ResponseDefaultDto responseDefaultDto = ResponseDefaultDto.builder().
                defaultSetting(res).
                build();
        return responseDefaultDto;
    }


    @Override
    public ResponseTagDto getTag(Long categoryNo) {

        Category category = categoryRepository.findByCategoryNo(categoryNo);
        Set<Tag> tags = category.getTags();
        List<TagDto> temp = new ArrayList<>();
        for(Tag tag: tags) {
            TagDto tagDto = new TagDto(tag);
            temp.add(tagDto);
        }
        ResponseTagDto responseTagDto = new ResponseTagDto(temp);
        return responseTagDto;
    }

    @Override
    public Integer getStar(String username) {

        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        Integer star = 0;
        if (userInfo.isPresent()) {
            UserInfo user = userInfo.get();
            star = user.getStar();
        }
        return star;
    }


    @Override
    public ResponseGenerateGeminiDto generateGemini(RequestGenerateGeminiDto requestGenerateGeminiDto, String username) {

        String defaultPrompt = "(illustration:1.3),(portrait:1.3),(best quality),(masterpiece),(high resolution),perfect anatomy,perfect_finger,hyper detail,high quality, super detail,(finely detailed beautiful eyes and detailed face),ultra detailed cloths,";
        for (Long tagId : requestGenerateGeminiDto.getTagIds()) {
            Tag tag = tagRepository.findByTagNo(tagId);
            defaultPrompt = defaultPrompt + tag.getPrompt() + ",";
        }
        GenerateGeminiDto generateGeminiDto = new GenerateGeminiDto(defaultPrompt, username, requestGenerateGeminiDto.getTagIds());
        if (requestGenerateGeminiDto.getSeed() != null) {
            generateGeminiDto.setSeed(requestGenerateGeminiDto.getSeed());
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String sdUrl = String.format(env.getProperty("sd.url")) + "/gemini";
        HttpEntity<GenerateGeminiDto> request = new HttpEntity<>(generateGeminiDto, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(sdUrl, request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
            if (userInfo.isPresent()) {
                UserInfo user = userInfo.get();
                Integer star = user.getStar() - 1;
                user.updateStar(star);
                userInfoRepository.save(user);
                ResponseGenerateGeminiDto responseGenerateGeminiDto = new ResponseGenerateGeminiDto(star, response.getBody());
                return responseGenerateGeminiDto;
            }
        }
        return null;
    }



    @Override
    public ResponseGetAllBackgroundDto getAllBackgrounds() {

        List<Background> backgrounds = backgroundRepository.findAllByOrderByBackgroundNoDesc();
        if (backgrounds == null) {
            return null;
        }
        List<BackgroundDto> backgroundDtos = new ArrayList<>();
        Integer i = 0;
        for (Background background : backgrounds) {
            i = i + 1;
            BackgroundDto backgroundDto = new BackgroundDto(background);
            backgroundDtos.add(backgroundDto);
            if (i > 19) {
                break;
            }
        }
        ResponseGetAllBackgroundDto responseGetAllBackgroundDto = new ResponseGetAllBackgroundDto(backgroundDtos);
        return responseGetAllBackgroundDto;
    }

    @Override
    public BackgroundDto getBackground(Long backgroundNo) {

        Background background = backgroundRepository.findByBackgroundNo(backgroundNo);
        if (background == null) {
            return null;
        }
        BackgroundDto backgroundDto = new BackgroundDto(background);
        return backgroundDto;
    }

    @Override
    public String generateBackground(String username, String background) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        GenerateBackgroundDto generateBackgroundDto = GenerateBackgroundDto.builder().
                username(username).
                description(background).
                build();
        String sdUrl = String.format(env.getProperty("sd.url")) + "/background";
        HttpEntity<GenerateBackgroundDto> request = new HttpEntity<>(generateBackgroundDto, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(sdUrl, request, String.class);
        return response.getBody();
    }



    @Override
    public ResponseGetAllPoseDto getAllPoses(String username) {

        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        if (!userInfo.isPresent()) {
            return null;
        }
        List<UserPose> userPoses = userPoseRepository.findByUserInfoOrderByUserPoseNoDesc(userInfo.get());
        List<PoseDto> poseDtos = new ArrayList<>();
        for (UserPose userPose : userPoses) {
            Long poseNo = userPose.getPose().getPoseNo();
            PoseImage poseImage = mongoTemplate.findOne(
                    Query.query(Criteria.where("poseNo").is(poseNo)),
                    PoseImage.class
            );
            PoseDto poseDto = PoseDto.builder().
                    poseNo(poseImage.getPoseNo()).
                    poseImages(poseImage.getImages()).
                    background(poseImage.getBackground()).
                    build();
            poseDtos.add(poseDto);
        }
        ResponseGetAllPoseDto responseGetAllPoseDto = ResponseGetAllPoseDto.builder().
                poseDtos(poseDtos).
                build();
        return responseGetAllPoseDto;
    }

    @Override
    public PoseDto getPose(Long poseNo) {

        PoseImage poseImage = mongoTemplate.findOne(
                Query.query(Criteria.where("poseNo").is(poseNo)),
                PoseImage.class
        );
        if (poseImage == null) {
            return null;
        }
        PoseDto poseDto = PoseDto.builder().
                poseNo(poseNo).
                poseImages(poseImage.getImages()).
                build();
        return poseDto;
    }

    @Override
    public ResponseGeneratePoseDto generatePose(RequestGeneratePoseDto requestGeneratePoseDto) {

        List<String> prompts = new ArrayList<>();
        List<Long> seeds = new ArrayList<>();

        for(Long geminiNo : requestGeneratePoseDto.getGeminis()) {
            Gemini gemini = geminiRepository.findByGeminiNo(geminiNo);
            GeminiTag geminiTag = mongoTemplate.findOne(
                    Query.query(Criteria.where("geminiNo").is(geminiNo)),
                    GeminiTag.class
            );
            seeds.add(gemini.getSeed());
            prompts.add(geminiTag.getPrompt());
        }
        GeneratePoseDto generatePoseDto = GeneratePoseDto.builder().
                geminis(requestGeneratePoseDto.getGeminis()).
                gemini_prompt(prompts).
                gemini_seed(seeds).
                pose_id(requestGeneratePoseDto.getSample()).
                build();
        if (requestGeneratePoseDto.getBackgroundUrl() != null) {
            generatePoseDto.setBackground_url(requestGeneratePoseDto.getBackgroundUrl());
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String sdUrl = String.format(env.getProperty("sd.url")) + "/pose";
        HttpEntity<GeneratePoseDto> request = new HttpEntity<>(generatePoseDto, headers);
        ResponseEntity<ResponseGeneratePoseDto> response = restTemplate.postForEntity(sdUrl, request, ResponseGeneratePoseDto.class);
        ResponseGeneratePoseDto responseGeneratePoseDto = response.getBody();

        return responseGeneratePoseDto;
    }


}
