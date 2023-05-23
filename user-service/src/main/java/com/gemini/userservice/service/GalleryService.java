package com.gemini.userservice.service;

import com.gemini.userservice.dto.request.RequestUpdateGeminiDto;
import com.gemini.userservice.dto.response.*;

public interface GalleryService {

    Long getTotal();

    ResponseGalleryPageDto getGalleryPage(Integer page, Integer size);


    ResponseGeminiPageDto getMyGalleryPage(String username, Integer page, Integer size); // 😀 내 갤러리

    ResponseGalleryPageDto getUserGalleryPage(String nickname, Integer page, Integer size); // 😀 유저 갤러리

    ResponseRankingDto getDailyGallery();

    ResponseRankingDto getWeeklyGallery();

    ResponseEmotionDto getDailyEmotion(Long galleryNo);

    ResponseEmotionDto getWeeklyEmotion(Long galleryNo);

    ResponseGalleryDetailDto getGalleryDetail(String username, Long galleryNo);

    ResponseGeminiDetailDto getGeminiDetail(String username, Long geminiNo);

    void createGallery(Long geminiNo);

    void deleteGallery(Long geminiNo);

    String likeGallery(String username, Long galleryNo);

    String cancelGalleryLike(String username, Long galleryNo);

    String updateGemini(RequestUpdateGeminiDto requestUpdateGeminiDto);

    String deleteGemini(String username, Long geminiNo);
}
