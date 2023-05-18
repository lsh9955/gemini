package com.gemini.userservice.api;

import com.gemini.userservice.dto.Alarm.LikeAlarmDto;
import com.gemini.userservice.dto.request.RequestUpdateGeminiDto;
import com.gemini.userservice.dto.response.*;
import com.gemini.userservice.service.AlarmService;
import com.gemini.userservice.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.gemini.userservice.service.EmitterService;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/gallery")
public class GalleryApiController {

    private final GalleryService galleryService;

    @Autowired
    private EmitterService emitterService;

    @Autowired
    private AlarmService alarmService;

    @GetMapping("/total")
    public  ResponseEntity<Long> getTotal() {

        Long total = galleryService.getTotal();
        return ResponseEntity.status(HttpStatus.OK).body(total);
    }

    @GetMapping
    public ResponseEntity<?> getGalleryPage(@RequestParam Integer page, @RequestParam Integer size) {

        ResponseGalleryPageDto responseGalleryPageDto = galleryService.getGalleryPage(page, size);
        if (responseGalleryPageDto.getGalleryPage() == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("no content");
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseGalleryPageDto);
    }

    @GetMapping("/daily")
    public ResponseEntity<ResponseRankingDto> getDailyGallery() {

        ResponseRankingDto responseRankingDto = galleryService.getDailyGallery();
        if (responseRankingDto.getRankingDtos() == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseRankingDto);
    }

    @GetMapping("/weekly")
    public ResponseEntity<ResponseRankingDto> getWeeklyGallery() {

        ResponseRankingDto responseRankingDto = galleryService.getWeeklyGallery();
        if (responseRankingDto.getRankingDtos() == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseRankingDto);
    }

    @GetMapping("/daily/{galleryNo}")
    public ResponseEntity<ResponseEmotionDto> getDailyEmotion(@PathVariable("galleryNo") Long galleryNo) {

        ResponseEmotionDto responseEmotionDto = galleryService.getDailyEmotion(galleryNo);
        if (responseEmotionDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseEmotionDto);
    }

    @GetMapping("/weekly/{galleryNo}")
    public ResponseEntity<ResponseEmotionDto> getWeeklyEmotion(@PathVariable("galleryNo") Long galleryNo) {

        ResponseEmotionDto responseEmotionDto = galleryService.getWeeklyEmotion(galleryNo);
        if (responseEmotionDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseEmotionDto);
    }

    @GetMapping("/{galleryNo}") // galleryNo로 조회 (유저페이지, 일반 게시판전용)
    public ResponseEntity<ResponseGalleryDetailDto> getGalleryDetail(@RequestHeader("X-Username") String username,
                                                                     @PathVariable("galleryNo") Long galleryNo) {

        ResponseGalleryDetailDto responseGalleryDetailDto = galleryService.getGalleryDetail(username, galleryNo);
        return ResponseEntity.status(HttpStatus.OK).body(responseGalleryDetailDto);
    }

    @GetMapping("/gemini/{geminiNo}") // geminiNo로 조회 (마이페이지 전용)
    public ResponseEntity<ResponseGeminiDetailDto> getGeminiDetail(@RequestHeader("X-Username") String username,
                                                                     @PathVariable("geminiNo") Long geminiNo) {

        ResponseGeminiDetailDto responseGeminiDetailDto = galleryService.getGeminiDetail(username, geminiNo);
        return ResponseEntity.status(HttpStatus.OK).body(responseGeminiDetailDto);
    }


    @PostMapping
    public ResponseEntity<String> likeGallery(@RequestHeader("X-Username") String username,
                                                                @RequestBody Map<String, Long> galleryMap) throws IOException {

        SseEmitter emitter = new SseEmitter();
        emitterService.addEmitter(emitter);


        Long galleryNo = galleryMap.get("gallery_no"); // body에 gallery_no:1 형식으로 JSON을 보내야
        String res = galleryService.likeGallery(username, galleryNo);
        // 총 좋아요 값인 res가 10의 배수 일때만 알람을 만듦
        int likeCount = Integer.parseInt(res);
        if (res == "fail") {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        } else if (likeCount % 10 == 0) {
            try {
                // 알람 메세지를 만들기 위해 LikeAlarmDto에 넣어준다.
                // gallary_no 를 사용해서 gemini pk 가져오기
                LikeAlarmDto likeAlarmDto = new LikeAlarmDto();
                likeAlarmDto.setGalleryNo(galleryNo);

                // 팔로우 알림 생성
//                alarmService.createLikeAlarm(username, likeAlarmDto, emitter);

                emitter.send(SseEmitter.event().name("COMPLETE").data("SUCCESS")); // success message
            } catch (IOException e) {
                emitter.send(SseEmitter.event().name("ERROR").data(e.getMessage())); // error message
            } finally {
                emitter.complete(); // complete emitter
                emitterService.removeEmitter(emitter); // remove emitter from emitterService

            }


        }

        return ResponseEntity.status(HttpStatus.OK).body(res); // body에 결과좋아요 개수 반환
    }

    @DeleteMapping("/{galleryNo}")
    public ResponseEntity<String> cancelGalleryLike(@RequestHeader("X-Username") String username,
                                                                @PathVariable("galleryNo") Long galleryNo) {

        String res = galleryService.cancelGalleryLike(username, galleryNo);
        if (res == "fail") {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res); // 좋아요 취소 후, body에 결과좋아요 개수 반환
    }

    @GetMapping("/mygeminis") // fetching my geminis. Pk에 geminiPk를 담음. (일반 조회, 다른유저조회는 galleryPK를 담아서 반환. FE에도 적용 필요함.)
    public ResponseEntity<?> getMyGeminiPage(@RequestHeader("X-Username") String username, @RequestParam Integer page, @RequestParam Integer size) {
    /*
    1. header에 담긴 username으로 userInfo탐색
    2. Gemini repository에서 다 가져오기
    3. 원하는만큼 뱉어서 Dto에 제공
     */
        ResponseGeminiPageDto responseGalleryPageDto = galleryService.getMyGalleryPage(username, page, size);
        if (responseGalleryPageDto.getGeminiPage() == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("no content");
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseGalleryPageDto);
    }
//
//
    @PostMapping("/usergalleries") // responseDto에 geminiPk말고, galleryPk를 담음.
    public ResponseEntity<?> getUserGalleryPage(@RequestParam Integer page, @RequestParam Integer size, @RequestBody Map<String, String> galleryMap) {
        /*

         */
        String nickname = galleryMap.get("nickname");
        ResponseGalleryPageDto responseGalleryPageDto = galleryService.getUserGalleryPage(nickname, page, size);
        if (responseGalleryPageDto.getGalleryPage() == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("no content");
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseGalleryPageDto);
    }

    @PatchMapping("/enrollment") // isPublic을 받아서 현재상태와 비교한 후, 갤러리에 등록/삭제 분기처리
    public ResponseEntity<?> updateGemini(@RequestHeader("X-Username") String username, @RequestBody RequestUpdateGeminiDto requestUpdateGeminiDto) {

        String res = galleryService.updateGemini(requestUpdateGeminiDto);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/gemini/{geminiNo}")
    public ResponseEntity<?> deleteGemini(@RequestHeader("X-Username") String username,
                                          @PathVariable("geminiNo") Long geminiNo) {

        String res = galleryService.deleteGemini(username, geminiNo);
        if (res == "invalid user") {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        return ResponseEntity.ok(res);
    }
}
