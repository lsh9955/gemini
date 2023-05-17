package com.gemini.userservice.api;

import com.gemini.userservice.dto.ML.RequestCompleteBackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.ML.RequestCompletePoseDto;
import com.gemini.userservice.service.CompleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/complete")
public class CompleteApiController {

    private final CompleteService completeService;

    @PostMapping("/gemini")
    public ResponseEntity<?> completeGemini(@RequestBody RequestCompleteGeminiDto requestCompleteGeminiDto) {

        Long res = completeService.completeGemini(requestCompleteGeminiDto);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/background")
    public ResponseEntity<?> completeBackground(@RequestBody RequestCompleteBackgroundDto requestCompleteBackgroundDto) {

        String res = completeService.completeBackground(requestCompleteBackgroundDto);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/pose")
    public ResponseEntity<?> completePose(@RequestBody RequestCompletePoseDto requestCompletePoseDto) {

        List<String> res = completeService.completePose(requestCompletePoseDto);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/background")
    public ResponseEntity<?> checkBackground(@RequestParam("background") String imageUrl) {

        String res = completeService.checkBackground(imageUrl);
        if (res == null) {
            ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
