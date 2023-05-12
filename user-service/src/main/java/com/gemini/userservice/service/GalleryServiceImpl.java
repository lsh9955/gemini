package com.gemini.userservice.service;

import com.gemini.userservice.dto.GalleryDto;
import com.gemini.userservice.dto.GeminiDto;
import com.gemini.userservice.dto.ProfileResponseDto;
import com.gemini.userservice.dto.response.ResponseGalleryDetailDto;
import com.gemini.userservice.dto.response.ResponseGalleryPageDto;
import com.gemini.userservice.dto.response.ResponseGalleryRankingDto;
import com.gemini.userservice.entity.Gallery;
import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.Like;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.GalleryRepository;
import com.gemini.userservice.repository.GeminiRepository;
import com.gemini.userservice.repository.LikeRepository;
import com.gemini.userservice.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService{

    private final GalleryRepository galleryRepository;

    private final UserInfoRepository userInfoRepository;

    private final LikeRepository likeRepository;

    private final GeminiRepository geminiRepository;

    private final RedisTemplate<String, Object> redisTemplate;

    public Long getTotal() {
        Long total = galleryRepository.count();
        return total;
    }

    public ResponseGalleryPageDto getGalleryPage(Integer page, Integer size) {

        List<Gallery> galleries = galleryRepository.findAll();
        if (galleries.size() > 0) {
            if (galleries.size() < size) {
                size = galleries.size();
            }
            Pageable pageable = PageRequest.of(page, size);
            int start = (int)pageable.getOffset();
            if (start + 1 > galleries.size()) {
                ResponseGalleryPageDto responseGalleryPageDto = new ResponseGalleryPageDto();
                return responseGalleryPageDto;
            }
            List<GalleryDto> galleryDtos = new ArrayList<>();
            for (int i = start; i < start + size; i++) {
                if (galleries.size() < i + 1) {
                    break;
                }
                Gallery gallery = galleries.get(i);

                GalleryDto galleryDto = new GalleryDto(gallery, gallery.getGemini());
                galleryDtos.add(galleryDto);
            }
            Page<GalleryDto> galleryPage = new PageImpl<>(galleryDtos, pageable, galleries.size());
            ResponseGalleryPageDto responseGalleryPageDto = new ResponseGalleryPageDto(galleryPage);
            return responseGalleryPageDto;
        }
        ResponseGalleryPageDto responseGalleryPageDto = new ResponseGalleryPageDto();
        return responseGalleryPageDto;
    }

    public ResponseGalleryRankingDto getDailyGallery() {

        ResponseGalleryRankingDto responseGalleryRankingDto = new ResponseGalleryRankingDto();
        return responseGalleryRankingDto;
    }

    public ResponseGalleryRankingDto getWeeklyGallery() {

        String key = "weekly";
        long start = 0;
        long end = -1;

        Set<Object> galleries = redisTemplate.execute((RedisCallback<Set<Object>>) connection -> {
            Set<Object> weeklySet = new LinkedHashSet<>();
            Set<byte[]> bytesSet = connection.zRange(key.getBytes(), start, end);
            for (byte[] bytes : bytesSet) {
                weeklySet.add(redisTemplate.getValueSerializer().deserialize(bytes));
            }
            return weeklySet;
        });

        for (Object gallery : galleries) {
            System.out.println("gallery: " + gallery);
        }
        ResponseGalleryRankingDto responseGalleryRankingDto = new ResponseGalleryRankingDto();
        return responseGalleryRankingDto;
    }

    public ResponseGalleryDetailDto getGalleryDetail(String username, Long galleryNo) {

        Optional<UserInfo> me = userInfoRepository.findByUsername(username);
        Gallery gallery = galleryRepository.findByGalleryNo(galleryNo);
        Gemini gemini = gallery.getGemini();
        Optional<Like> isLiked = likeRepository.findByUserInfoAndGemini(me.get(), gemini);
        Boolean liked = isLiked.isPresent();
        UserInfo producer = gemini.getUserInfo();

        ResponseGalleryDetailDto responseGalleryDetailDto = new ResponseGalleryDetailDto(producer, gemini, liked);
        return responseGalleryDetailDto;
    }

    public String likeGallery(String username, Long galleryNo) {

        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        Gallery gallery = galleryRepository.findByGalleryNo(galleryNo);
        Gemini gemini = gallery.getGemini();
        Optional<Like> isLiked = likeRepository.findByUserInfoAndGemini(userInfo.get(), gemini);
        if (isLiked.isPresent()) {
            return "fail";
        }
        Like like = Like.builder()
                    .gemini(gallery.getGemini())
                    .userInfo(userInfo.get())
                    .build();
        likeRepository.save(like);
        Integer totalLikes = gemini.getTotalLike();
        Integer dailyLikes = gallery.getDailyLike();
        Integer weeklyLikes = gallery.getWeeklyLike();
        gemini.updateLikes(totalLikes + 1);
        gallery.updateLikes(dailyLikes + 1, weeklyLikes + 1);
        geminiRepository.save(gemini);
        galleryRepository.save(gallery);

        return String.valueOf(totalLikes + 1); // 좋아요 성공하면, 전체 좋아요 개수를 다시 반환해줌.
    }

    public String cancelGalleryLike(String username, Long galleryNo) {

        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        Gallery gallery = galleryRepository.findByGalleryNo(galleryNo);
        Gemini gemini = gallery.getGemini();
        Optional<Like> isLiked = likeRepository.findByUserInfoAndGemini(userInfo.get(), gemini);
        if (isLiked.isPresent()) {
            likeRepository.delete(isLiked.get());
            Integer totalLikes = gemini.getTotalLike();
            Integer dailyLikes = gallery.getDailyLike();
            Integer weeklyLikes = gallery.getWeeklyLike();
            gemini.updateLikes(totalLikes - 1);
            gallery.updateLikes(dailyLikes - 1, weeklyLikes - 1);
            geminiRepository.save(gemini);
            galleryRepository.save(gallery);
            return String.valueOf(totalLikes - 1);
        }
        return "fail";
    }
}
