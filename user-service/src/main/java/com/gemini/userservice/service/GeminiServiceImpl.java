package com.gemini.userservice.service;

import com.gemini.userservice.dto.GenerateGeminiDto;
import com.gemini.userservice.dto.TagDto;
import com.gemini.userservice.dto.request.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseTagDto;
import com.gemini.userservice.entity.*;
import com.gemini.userservice.repository.CategoryRepository;
import com.gemini.userservice.repository.GeminiRepository;
import com.gemini.userservice.repository.TagRepository;
import com.gemini.userservice.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class GeminiServiceImpl implements GeminiService{

    private final TagRepository tagRepository;

    private final RestTemplate restTemplate;

    private final MongoTemplate mongoTemplate;

    private final Environment env;

    private final UserInfoRepository userInfoRepository;

    private final CategoryRepository categoryRepository;
    private final GeminiRepository geminiRepository;


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
        String sdUrl = String.format(env.getProperty("sd.url")) + "/makegemini";
        HttpEntity<GenerateGeminiDto> request = new HttpEntity<>(generateGeminiDto, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(sdUrl, request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
            if (userInfo.isPresent()) {
                UserInfo user = userInfo.get();
                Integer star = user.getStar() - 1;
                user.updateStar(star);
                userInfoRepository.save(user);
                ResponseGenerateGeminiDto responseGenerateGeminiDto = new ResponseGenerateGeminiDto(star);
                return responseGenerateGeminiDto;
            }
        }
        return null;
    }

    @Override
    public Long completeGemini(RequestCompleteGeminiDto requestCompleteGeminiDto) {

        Gemini gemini = Gemini.builder()
                .imageUrl(requestCompleteGeminiDto.getImgUrl())
                .totalLike(0)
                .seed(requestCompleteGeminiDto.getSeed())
                .build();
        geminiRepository.save(gemini);
        GeminiTag geminiTag = GeminiTag.builder()
                .geminiNo(gemini.getGeminiNo())
                .tagIds(requestCompleteGeminiDto.getTagIds())
                .build();
        mongoTemplate.insert(geminiTag, "gemini_tag");
        return gemini.getGeminiNo();
    }

}
