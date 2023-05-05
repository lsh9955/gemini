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

        Long galleryNo = galleryMap.get("gallery_no");
        String res = galleryService.likeGallery(username, galleryNo);
        if (res == "fail") {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/{galleryNo}")
    public ResponseEntity<String> cancelGallery(@RequestHeader("X-Username") String username,
                                                                @PathVariable("galleryNo") Long galleryNo) {

        String res = galleryService.cancelGallery(username, galleryNo);
        if (res == "fail") {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
