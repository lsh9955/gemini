package com.gemini.userservice.service;

import com.gemini.userservice.dto.response.ResponseGalleryDetailDto;
import com.gemini.userservice.dto.response.ResponseGalleryPageDto;
import com.gemini.userservice.dto.response.ResponseGalleryRankingDto;

public interface GalleryService {

    Long getTotal();

    ResponseGalleryPageDto getGalleryPage(Integer page, Integer size);

    ResponseGalleryRankingDto getDailyGallery();

    ResponseGalleryRankingDto getWeeklyGallery();

    ResponseGalleryDetailDto getGalleryDetail(String username, Long galleryNo);

    String likeGallery(String username, Long galleryNo);

    String cancelGallery(String username, Long galleryNo);
}
