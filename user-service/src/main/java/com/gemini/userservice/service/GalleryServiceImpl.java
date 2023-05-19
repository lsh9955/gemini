package com.gemini.userservice.service;

import com.gemini.userservice.dto.*;
import com.gemini.userservice.dto.request.RequestUpdateGeminiDto;
import com.gemini.userservice.dto.response.*;
import com.gemini.userservice.entity.*;
import com.gemini.userservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService{

    private final GalleryRepository galleryRepository;

    private final UserInfoRepository userInfoRepository;

    private final LikeRepository likeRepository;

    private final GeminiRepository geminiRepository;

    private final MongoTemplate mongoTemplate;

    private final TagRepository tagRepository;

    private final DailyRepository dailyRepository;

    private final WeeklyRepository weeklyRepository;

    public Long getTotal() {
        Long total = galleryRepository.count();
        return total;
    }

    // 전체갤러리. 페이징 조회 기준은 갤러리.
    // 반환해주는게 갤러리 pk인가? 제미니 pk인가? -> 제미니 pk여야함. 😀 확인필요. 제미니 pk를 보내고 있는지 갤러리 pk를 보내고 있는지
    public ResponseGalleryPageDto getGalleryPage(Integer page, Integer size) {

        List<Gallery> galleries = galleryRepository.findAllByOrderByGalleryNoDesc();
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


    // 내 갤러리. 페이징 조회 기준은 갤러리.
    // 반환해주는게 갤러리 pk인가? 제미니 pk인가? -> 제미니 pk여야함. 😀 확인필요. 제미니 pk를 보내고 있는지 갤러리 pk를 보내고 있는지
    public ResponseGeminiPageDto getMyGalleryPage(String username, Integer page, Integer size) {
        Optional<UserInfo> optionalUserInfo = userInfoRepository.findByUsername(username);
        if (!optionalUserInfo.isPresent()) {
            // 사용자가 존재하지 않는 경우 처리
            // 예: 예외를 던지거나 빈 ResponseGalleryPageDto를 반환
        }
        UserInfo userInfo = optionalUserInfo.get();
        List<Gemini> myGeminis = geminiRepository.findByUserInfoOrderByGeminiNoDesc(userInfo);

//        List<Gallery> galleries = galleryRepository.findByGemini_UserInfo(userInfo);

        // 위에서 사용했던 로직을 재사용
        if (myGeminis.size() > 0) {
            if (myGeminis.size() < size) {
                size = myGeminis.size();
            }
            Pageable pageable = PageRequest.of(page, size);
            int start = (int)pageable.getOffset();
            if (start + 1 > myGeminis.size()) {
                ResponseGeminiPageDto responseGeminiPageDto = new ResponseGeminiPageDto();
                return responseGeminiPageDto;
            }
            List<GeminiDto> geminiDtos = new ArrayList<>();
            for (int i = start; i < start + size; i++) {
                if (myGeminis.size() < i + 1) {
                    break;
                }
                Gemini myGemini = myGeminis.get(i);

                GeminiDto geminiDto = new GeminiDto(myGemini);
                geminiDtos.add(geminiDto);
            }
            Page<GeminiDto> geminiPage = new PageImpl<>(geminiDtos, pageable, myGeminis.size());
            ResponseGeminiPageDto responseGeminiPageDto = new ResponseGeminiPageDto(geminiPage);
            return responseGeminiPageDto;
        }
        ResponseGeminiPageDto responseGeminiPageDto = new ResponseGeminiPageDto();
        return responseGeminiPageDto;
    }


    // 유저갤러리. 페이징 조회 기준은 갤러리. -> 제미니 기준으로 바꾸는게 좋음. (갤러리는 ispublic으로 한번 필터링 된놈들이라서..)
    // 반환해주는게 갤러리 pk인가? 제미니 pk인가? -> 제미니 pk여야함. 😀 수정필요.
    public ResponseGalleryPageDto getUserGalleryPage(String nickname, Integer page, Integer size) {
        Optional<UserInfo> optionalUserInfo = userInfoRepository.findByNickname(nickname);
        if (!optionalUserInfo.isPresent()) {
            // 사용자가 존재하지 않는 경우 처리
            // 예: 예외를 던지거나 빈 ResponseGalleryPageDto를 반환
        }
        UserInfo userInfo = optionalUserInfo.get();
//        List<Gallery> galleries = galleryRepository.findByGemini_UserInfoAndGemini_IsPublic(userInfo, true);
//        List<Gallery> galleries = galleryRepository.findPublicGalleriesByUserInfo(userInfo);
        List<Gallery> galleries = galleryRepository.findByGemini_UserInfo(userInfo);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@ 다른유저 갤러리 페이징 합니다.");


        // 위에서 사용했던 로직을 재사용
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


    public ResponseRankingDto getDailyGallery() {

        Iterable<Daily> dailyList = dailyRepository.findAll();
        List<RankingDto> rankingDtos = new ArrayList<>();
        System.out.println("daily: 1111111111111111111111111111111111111" );
        System.out.println(dailyList);
        for (Daily daily : dailyList) {
            Long galleryNo = daily.getGalleryNo();
            Gallery gallery = galleryRepository.findByGalleryNo(galleryNo);
            RankingDto rankingDto = RankingDto.builder().
                    galleryNo(galleryNo).
                    imageUrl(gallery.getGemini().getImageUrl()).
                    build();
            rankingDtos.add(rankingDto);
        }
        ResponseRankingDto responseRankingDto = new ResponseRankingDto(rankingDtos);
        return responseRankingDto;
    }

    public ResponseRankingDto getWeeklyGallery() {

        Iterable<Weekly> weeklyList = weeklyRepository.findAll();
        List<RankingDto> rankingDtos = new ArrayList<>();
        for (Weekly weekly : weeklyList) {
            Long galleryNo = weekly.getGalleryNo();
            Gallery gallery = galleryRepository.findByGalleryNo(galleryNo);
            RankingDto rankingDto = RankingDto.builder().
                    galleryNo(galleryNo).
                    imageUrl(gallery.getGemini().getImageUrl()).
                    build();
            rankingDtos.add(rankingDto);
        }
        ResponseRankingDto responseRankingDto = new ResponseRankingDto(rankingDtos);
        return responseRankingDto;
    }

    public ResponseEmotionDto getDailyEmotion(Long galleryNo) {

        Optional<Daily> daily = dailyRepository.findById(galleryNo);
        if(!daily.isPresent()) {
            return null;
        }
        Daily dailyGallery = daily.get();
        List<String> emotions = dailyGallery.getEmotionUrls();
        ResponseEmotionDto responseEmotionDto = new ResponseEmotionDto(emotions);
        return responseEmotionDto;
    }

    public ResponseEmotionDto getWeeklyEmotion(Long galleryNo) {

        Optional<Weekly> weekly = weeklyRepository.findById(galleryNo);
        if(!weekly.isPresent()) {
            return null;
        }
        Weekly weeklyGallery = weekly.get();
        List<String> emotions = weeklyGallery.getEmotionUrls();
        ResponseEmotionDto responseEmotionDto = new ResponseEmotionDto(emotions);
        return responseEmotionDto;
    }

    public ResponseGalleryDetailDto getGalleryDetail(String username, Long galleryNo) {

        Optional<UserInfo> me = userInfoRepository.findByUsername(username);
        Gallery gallery = galleryRepository.findByGalleryNo(galleryNo);
        Gemini gemini = gallery.getGemini();
        Optional<Like> isLiked = likeRepository.findByUserInfoAndGemini(me.get(), gemini);
        Boolean liked = isLiked.isPresent();
        UserInfo producer = gemini.getUserInfo();
        List<String> tags = getTagNames(gemini.getGeminiNo());
        ResponseGalleryDetailDto responseGalleryDetailDto = new ResponseGalleryDetailDto(producer, gemini, liked, tags);

        return responseGalleryDetailDto;
    }

    public ResponseGeminiDetailDto getGeminiDetail(String username, Long geminiNo) {

        Optional<UserInfo> owner = userInfoRepository.findByUsername(username);
        Gemini gemini = geminiRepository.findByGeminiNo(geminiNo);
        List<String> tags = getTagNames(geminiNo);

        return ResponseGeminiDetailDto.builder()
                .geminiName(gemini.getName())
                .geminiDescription(gemini.getDescription())
                .geminiImage(gemini.getImageUrl())
                .isPublic(gemini.getIsPublic())
                .totalLike(gemini.getTotalLike())
                .tags(tags) // 😀수정 필요
                .build();
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

    public List<String> getTagNames(Long geminiNo) {

        GeminiTag geminiTag = mongoTemplate.findOne(
                Query.query(Criteria.where("geminiNo").is(geminiNo)),
                GeminiTag.class
        );
        List<String> tagNames = new ArrayList<>();
        for(Long tagId: geminiTag.getTagIds()) {
            Tag tag = tagRepository.findByTagNo(tagId);
            String tagName = tag.getName();
            tagNames.add(tagName);
        }
        return tagNames;
    }



    public void createGallery(Long geminiNo) {

        Gemini gemini = geminiRepository.findById(geminiNo)
                .orElseThrow(() -> new IllegalArgumentException("Invalid geminiNo: " + geminiNo));
        gemini.setIsPublic(true);
        geminiRepository.save(gemini);

        Gallery gallery = Gallery.builder()
                .dailyLike(0)
                .weeklyLike(0)
                .gemini(gemini)
                .build();
        galleryRepository.save(gallery);
    }




    public void deleteGallery(Long geminiNo) {
        Gemini gemini = geminiRepository.findById(geminiNo)
                .orElseThrow(() -> new IllegalArgumentException("Invalid geminiNo: " + geminiNo));

        Gallery gallery = gemini.getGallery();

        if (gallery != null) {
            gemini.setIsPublic(false);
            geminiRepository.save(gemini);
            galleryRepository.delete(gallery);
        } else {
            throw new IllegalArgumentException("No Gallery associated with geminiNo: " + geminiNo);
        }
    }

    public String updateGemini(RequestUpdateGeminiDto requestUpdateGeminiDto) {

        Gemini gemini = geminiRepository.findByGeminiNo(requestUpdateGeminiDto.getGeminiPk());
        Boolean isPublic = requestUpdateGeminiDto.getIsPublic();
        Gallery gallery = galleryRepository.findByGemini(gemini);
        if (gallery == null) {
            if (isPublic == Boolean.TRUE) {
                Gallery gallery1 = Gallery.builder().
                        gemini(gemini).
                        weeklyLike(0).
                        dailyLike(0).
                        build();
                galleryRepository.save(gallery1);
                gemini.updateIsPublic(Boolean.TRUE);
            }
        }
        else {
            if (isPublic == Boolean.FALSE) {
                gemini.updateIsPublic(Boolean.FALSE);
                galleryRepository.delete(gallery);
            }
        }
        if (requestUpdateGeminiDto.getName() != null) {
            gemini.updateName(requestUpdateGeminiDto.getName());
        }
        if (requestUpdateGeminiDto.getDescription() != null) {
            gemini.updateDescription(requestUpdateGeminiDto.getDescription());
        }
        geminiRepository.save(gemini);
        return "ok";
    }

    public String deleteGemini(String username, Long geminiNo) {



        Gemini gemini = geminiRepository.findByGeminiNo(geminiNo);
        if (!gemini.getUserInfo().getUsername().equals(username)) {
            System.out.println(username);
            System.out.println(gemini.getUserInfo().getUsername());

            return "invalid user";
        }
        geminiRepository.delete(gemini);
        return "ok";
    }

}
