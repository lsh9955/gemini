package com.gemini.authservice.service;

import com.gemini.authservice.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.json.JSONObject;

@Service
public class ExternalApiService {

    @Autowired
    private WebClient webClient;

    @Value("${api_gateway_url}")
    private String apiGatewayUrl;

    public String sendUserToUserServiceServer(User user) {
        String url = "https://"+apiGatewayUrl +"/api/profile/enroll";

        return webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue("{\"userDto\":" + new JSONObject(user).toString() + "}")
                .exchangeToMono(response -> {
                    HttpStatus statusCode = response.statusCode();
                    System.out.println("응답 코드: " + statusCode);

                    // 필요하다면 응답 본문도 출력할 수 있습니다.
                    return response.bodyToMono(String.class)
                            .doOnNext(responseBody -> System.out.println("응답 본문: " + responseBody))
                            .thenReturn(statusCode.toString());
                })
                .block();
    }

}