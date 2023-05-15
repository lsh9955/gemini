package com.gemini.authservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.gemini.authservice.dto.UserDto;
import com.gemini.authservice.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.json.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ExternalApiService {

    @Autowired
    private WebClient webClient;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${custom.springboot.user_service_url}")
    private String userServiceGatewayUrl;

    public String sendUserToUserServiceServer(User user) {
        String url = userServiceGatewayUrl +"/user-service/profile/enroll";
        UserDto userDto = user.toUserDto();
        System.out.println(userDto);

        System.out.println("자 이제 회원가입 시켜본다!");

        System.out.println(userServiceGatewayUrl);
        System.out.println(url);

        try {
            String userDtoJson = objectMapper.writeValueAsString(userDto);
            System.out.println(userDtoJson);

            // 원래 코드를 수정하여 ObjectMapper로 변환된 JSON 문자열 사용
            return webClient.post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
//                    .bodyValue("{\"userDto\":" + userDtoJson + "}")
                    .bodyValue(userDtoJson)
                    .exchangeToMono(response -> {
                        HttpStatus statusCode = response.statusCode();
                        System.out.println("응답 코드: " + statusCode);

                        // 혹시 모르니 응답 본문도 출력
                        return response.bodyToMono(String.class)
                                .doOnNext(responseBody -> System.out.println("응답 본문: " + responseBody))
                                .thenReturn(statusCode.toString());
                    })
                    .block();
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error while converting UserDto to JSON", e);
        }
    }
}

