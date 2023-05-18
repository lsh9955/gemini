package com.gemini.userservice.service;

import com.gemini.userservice.dto.request.RequestUpdateGeminiDto;
import com.gemini.userservice.dto.response.*;
import com.gemini.userservice.entity.Gallery;

public interface GalleryService {

    Long getTotal();

    ResponseGalleryPageDto getGalleryPage(Integer page, Integer size);


    ResponseGeminiPageDto getMyGalleryPage(String username, Integer page, Integer size); // 😀 내 갤러리

    ResponseGalleryPageDto getUserGalleryPage(String nickname, Integer page, Integer size); // 😀 유저 갤러리

    ResponseGalleryRankingDto getDailyGallery();

    ResponseGalleryRankingDto getWeeklyGallery();

    ResponseGalleryDetailDto getGalleryDetail(String username, Long galleryNo);

    ResponseGeminiDetailDto getGeminiDetail(String username, Long geminiNo);

    void createGallery(Long geminiNo);

    void deleteGallery(Long geminiNo);

    String likeGallery(String username, Long galleryNo);

    String cancelGalleryLike(String username, Long galleryNo);

    String updateGemini(RequestUpdateGeminiDto requestUpdateGeminiDto);
}
