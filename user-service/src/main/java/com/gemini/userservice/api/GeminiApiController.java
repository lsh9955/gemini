package com.gemini.userservice.api;


import com.gemini.userservice.dto.request.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseGenerateGeminiDto;
import com.gemini.userservice.dto.response.ResponseTagDto;
import com.gemini.userservice.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/gemini")
public class GeminiApiController {

    private final GeminiService geminiService;

    @GetMapping("/{category_no}")
    public ResponseEntity<ResponseTagDto> getTag(@PathVariable("category_no") Long categoryNo) {

        ResponseTagDto responseTagDto = geminiService.getTag(categoryNo);
        return ResponseEntity.status(HttpStatus.OK).body(responseTagDto);
    }

    @GetMapping("")
    public ResponseEntity<Integer> getStar(@RequestHeader("X-Username") String username) {

        Integer star = geminiService.getStar(username);
        return ResponseEntity.status(HttpStatus.OK).body(star);
    }


    @PostMapping("")
    public ResponseEntity<?> generateGemini(@RequestHeader("X-Username") String username,
                                            @RequestBody RequestGenerateGeminiDto requestGenerateGeminiDto) {


        ResponseGenerateGeminiDto res = geminiService.generateGemini(requestGenerateGeminiDto, username);
        if (res == null) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

//    @PostMapping("/complete")
//    public ResponseEntity<?> completeGemini(@RequestBody RequestCompleteGeminiDto requestCompleteGeminiDto) {
//
//        String res = geminiService.completeGemini(requestCompleteGeminiDto);
//        return ResponseEntity.status(HttpStatus.OK).body(res);
//    }
}
