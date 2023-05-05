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

    private Page<GalleryDto> galleryPage;
}
