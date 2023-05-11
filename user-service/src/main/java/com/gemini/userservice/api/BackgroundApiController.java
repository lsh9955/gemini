package com.gemini.userservice.api;


import com.gemini.userservice.dto.request.RequestGenerateBackgroundDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseTagDto;
import com.gemini.userservice.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/background")
public class BackgroundApiController {

    private final GeminiService geminiService;

    @GetMapping("/{tag_id}")
    public ResponseEntity<ResponseTagDto> getTag(@PathVariable("tag_id") Long tagId) {

        ResponseTagDto responseTagDto = geminiService.getTag(tagId);
        return ResponseEntity.status(HttpStatus.OK).body(responseTagDto);
    }

//    @PostMapping("")
//    public ResponseEntity<?> generateBackground(@RequestBody RequestGenerateGeminiDto requestGenerateGeminiDto) {
//
//        String res = geminiService.generateGemini(requestGenerateGeminiDto);
//        return ResponseEntity.status(HttpStatus.OK).body(res);
//    }

//    @PostMapping("/makebackground")
//    public ResponseEntity<?> generateBackGround(@RequestBody RequestGenerateBackgroundDto requestGenerateBackgroundDto) {
//
//        String res = backgroundService.generateBackground(requestGenerateGeminiDto);
//        return ResponseEntity.status(HttpStatus.OK).body(res);
//    }
//
//    @PostMapping("/imagecomplete")
//    public ResponseEntity<?> generateBackGround(@RequestBody RequestGenerateBackgroundDto requestGenerateBackgroundDto) {
//
//        String res = backgroundService.generateBackground(requestGenerateGeminiDto);
//        return ResponseEntity.status(HttpStatus.OK).body(res);
//    }
}


