package com.gemini.userservice.service;

import com.gemini.userservice.dto.request.RequestGenerateBackgroundDto;

public interface BackgroundService {

    String generateBackground(RequestGenerateBackgroundDto requestGenerateBackgroundDto);
}
