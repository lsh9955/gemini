package com.gemini.userservice.dto.response;

import com.gemini.userservice.dto.GalleryDto;
import com.gemini.userservice.dto.GeminiDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ResponseGeminiPageDto {
    // GalleryDto는 geminiPk, image, userPk 담고 있음.

    private Page<GeminiDto> geminiPage;

}
