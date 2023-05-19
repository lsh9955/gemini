package com.gemini.userservice.dto.response;

import com.gemini.userservice.dto.GalleryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ResponseGalleryPageDto {
    // GalleryDto는 gallery의 PK와 imgUrl을 담고 있음.

    private Page<GalleryDto> galleryPage;
}
