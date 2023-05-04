package com.gemini.userservice.dto.response;

import com.gemini.userservice.dto.GalleryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ResponseGalleryRankingDto {

    private List<GalleryDto> galleryDtos;
}
