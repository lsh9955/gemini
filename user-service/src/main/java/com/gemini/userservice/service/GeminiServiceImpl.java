package com.gemini.userservice.service;

import com.gemini.userservice.dto.GenerateGeminiDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseTagDto;
import com.gemini.userservice.entity.Tag;
import com.gemini.userservice.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class GeminiServiceImpl implements GeminiService{

    private final TagRepository tagRepository;

    private final WebClient webClient;

    @Override
    public ResponseTagDto getTag(Long tagId) {

        Tag tag = tagRepository.findByTagNo(tagId);
        ResponseTagDto responseTagDto = new ResponseTagDto(tag);
        return responseTagDto;
    }

    @Override
    public String generateGemini(RequestGenerateGeminiDto requestGenerateGeminiDto, String username) {

        String defaultPrompt = "(illustration:1.3),(portrait:1.3),(best quality),(masterpiece),(high resolution),perfect anatomy,perfect_finger,hyper detail,high quality, super detail,(finely detailed beautiful eyes and detailed face),ultra detailed cloths,";
        for (Long tagId : requestGenerateGeminiDto.getTagIds()) {
            Tag tag = tagRepository.findByTagNo(tagId);
            defaultPrompt = defaultPrompt + tag.getPrompt() + ",";
        }
        GenerateGeminiDto generateGeminiDto = new GenerateGeminiDto(defaultPrompt, username);
        String url = "http://127.0.0.1:7860/ml_api/makegemini";
        String res = webClient.post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(generateGeminiDto)
                    .exchangeToMono(response -> {
                        HttpStatus statusCode = response.statusCode();
                        System.out.println("응답 코드: " + statusCode);

                        // 혹시 모르니 응답 본문도 출력
                        return response.bodyToMono(String.class)
                                .doOnNext(responseBody -> System.out.println("응답 본문: " + responseBody))
                                .thenReturn(statusCode.toString());
                    })
                    .block();
        return res;
        }

}
