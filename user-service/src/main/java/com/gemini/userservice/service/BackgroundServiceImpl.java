package com.gemini.userservice.service;

import com.gemini.userservice.dto.GenerateGeminiDto;
import com.gemini.userservice.dto.request.RequestGenerateBackgroundDto;
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
public class BackgroundServiceImpl implements BackgroundService{

    private final TagRepository tagRepository;

    private final WebClient webClient;


    @Override
    public String generateBackground(RequestGenerateBackgroundDto requestGenerateBackgroundDto) {
        return null;
    }
}
