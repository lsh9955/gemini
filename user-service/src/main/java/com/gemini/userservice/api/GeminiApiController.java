package com.gemini.userservice.api;


import com.gemini.userservice.dto.request.RequestGenerateBackgroundDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseTagDto;
import com.gemini.userservice.service.GeminiService;
import com.gemini.userservice.service.BackgroundService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/gemini")
public class GeminiApiController {

    private final GeminiService geminiService;

    @GetMapping("/{tag_id}")
    public ResponseEntity<ResponseTagDto> getTag(@PathVariable("tag_id") Long tagId) {

        ResponseTagDto responseTagDto = geminiService.getTag(tagId);
        return ResponseEntity.status(HttpStatus.OK).body(responseTagDto);
    }

    @PostMapping("")
    public ResponseEntity<?> generateGemini(@RequestHeader("X-Username") String username,
                                            @RequestBody RequestGenerateGeminiDto requestGenerateGeminiDto) {


        String res = geminiService.generateGemini(requestGenerateGeminiDto, username);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeGemini(@RequestBody ) {

        String res = geminiService.completeGemini(requestGenerateGeminiDto);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
