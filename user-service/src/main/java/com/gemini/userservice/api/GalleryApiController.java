package com.gemini.userservice.api;

import com.gemini.userservice.dto.FollowRequestDto;
import com.gemini.userservice.dto.response.ResponseGalleryDetailDto;
import com.gemini.userservice.dto.response.ResponseGalleryPageDto;
import com.gemini.userservice.dto.response.ResponseGalleryRankingDto;
import com.gemini.userservice.entity.Gallery;
import com.gemini.userservice.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/gallery")
public class GalleryApiController {

    private final GalleryService galleryService;

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
                                                                @RequestBody Map<String, Long> galleryMap) {

        Long galleryNo = galleryMap.get("gallery_no"); // body에 gallery_no:1 형식으로 JSON을 보내야.
        String res = galleryService.likeGallery(username, galleryNo);
        if (res == "fail") {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
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

    @GetMapping("/mygeminis") // fetching my geminis
    public ResponseEntity<?> getMyGalleryPage(@RequestHeader("X-Username") String username, @RequestParam Integer page, @RequestParam Integer size) {
    /*
    1. header에 담긴 username으로 userInfo탐색
    2. Gemini repository에서 다 가져오기
    3. 원하는만큼 뱉어서 Dto에 제공
     */
        ResponseGalleryPageDto responseGalleryPageDto = galleryService.getMyGalleryPage(username, page, size);
        if (responseGalleryPageDto.getGalleryPage() == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("no content");
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseGalleryPageDto);
    }
//
//
    @GetMapping("/usergeminis")
    public ResponseEntity<?> getUserGalleryPage(@RequestParam String nickname, @RequestParam Integer page, @RequestParam Integer size) {
        /*

         */
        ResponseGalleryPageDto responseGalleryPageDto = galleryService.getUserGalleryPage(nickname, page, size);
        if (responseGalleryPageDto.getGalleryPage() == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("no content");
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseGalleryPageDto);
    }

}
