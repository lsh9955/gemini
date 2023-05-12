package com.gemini.userservice.api;

import com.gemini.userservice.dto.Alarm.LikeAlarmDto;
import com.gemini.userservice.dto.FollowRequestDto;
import com.gemini.userservice.dto.response.ResponseGalleryDetailDto;
import com.gemini.userservice.dto.response.ResponseGalleryPageDto;
import com.gemini.userservice.dto.response.ResponseGalleryRankingDto;
import com.gemini.userservice.entity.Gallery;
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
    public ResponseEntity<ResponseGalleryRankingDto> getDailyGallery() {

        ResponseGalleryRankingDto responseGalleryRankingDto = galleryService.getDailyGallery();
        if (responseGalleryRankingDto.getGalleryDtos() == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseGalleryRankingDto);
    }

    @GetMapping("/weekly")
    public ResponseEntity<ResponseGalleryRankingDto> getWeeklyGallery() {

        ResponseGalleryRankingDto responseGalleryRankingDto = galleryService.getWeeklyGallery();
        if (responseGalleryRankingDto.getGalleryDtos() == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseGalleryRankingDto);
    }

    @GetMapping("/{galleryNo}")
    public ResponseEntity<ResponseGalleryDetailDto> getGalleryDetail(@RequestHeader("X-Username") String username,
                                                                     @PathVariable("galleryNo") Long galleryNo) {

        ResponseGalleryDetailDto responseGalleryDetailDto = galleryService.getGalleryDetail(username, galleryNo);
        return ResponseEntity.status(HttpStatus.OK).body(responseGalleryDetailDto);
    }

    @PostMapping
    public ResponseEntity<String> likeGallery(@RequestHeader("X-Username") String username,
                                                                @RequestBody Map<String, Long> galleryMap) throws IOException {

        // gallary_no 를 사용해서 gemini pk 가져오기
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
                LikeAlarmDto likeAlarmDto = new LikeAlarmDto();
                likeAlarmDto.setGalleryNo(galleryNo);

                // 팔로우 알림 생성
                alarmService.createLikeAlarm(username, likeAlarmDto, emitter);

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

//    @GetMapping("/getpage/my")
//
//
//    @GetMapping("/getPage/my")
//
//
//    @GetMapping("/getPage/my")

}
