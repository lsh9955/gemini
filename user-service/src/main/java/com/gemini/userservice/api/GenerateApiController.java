package com.gemini.userservice.api;


import com.gemini.userservice.dto.BackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompleteBackgroundDto;
import com.gemini.userservice.dto.ML.RequestCompletePoseDto;
import com.gemini.userservice.dto.PoseDto;
import com.gemini.userservice.dto.ML.RequestCompleteGeminiDto;
import com.gemini.userservice.dto.request.RequestGenerateGeminiDto;
import com.gemini.userservice.dto.request.RequestGeneratePoseDto;
import com.gemini.userservice.dto.response.*;
import com.gemini.userservice.service.GenerateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service/generate")
public class GenerateApiController {

    private final GenerateService generateService;

    @GetMapping("")
    public ResponseEntity<Integer> getStar(@RequestHeader("X-Username") String username) {

        Integer star = generateService.getStar(username);
        return ResponseEntity.status(HttpStatus.OK).body(star);
    }

    @GetMapping("/{categoryNo}")
    public ResponseEntity<ResponseTagDto> getTag(@PathVariable("categoryNo") Long categoryNo) {

        ResponseTagDto responseTagDto = generateService.getTag(categoryNo);
        return ResponseEntity.status(HttpStatus.OK).body(responseTagDto);
    }

    @GetMapping("/default/gemini/{galleryNo}")  //galleryNo로 geminiNo 리턴
    public ResponseEntity<?> getGalleryToGeminiNo(@PathVariable("galleryNo") Long galleryNo) {

        Long geminiNo = generateService.getGalleryToGeminiNo(galleryNo);
        return ResponseEntity.status(HttpStatus.OK).body(geminiNo);
    }

    @GetMapping("/default/{geminiNo}")
    public ResponseEntity<?> getDefault(@PathVariable("geminiNo") Long geminiNo) {

        ResponseDefaultDto responseDefaultDto = generateService.getDefault(geminiNo);
        return ResponseEntity.status(HttpStatus.OK).body(responseDefaultDto);
    }

    @PostMapping("/gemini")
    public ResponseEntity<?> generateGemini(@RequestHeader("X-Username") String username,
                                            @RequestBody RequestGenerateGeminiDto requestGenerateGeminiDto) {


        ResponseGenerateGeminiDto res = generateService.generateGemini(requestGenerateGeminiDto, username);
        if (res == null) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/background")
    public ResponseEntity<ResponseGetAllBackgroundDto> getAllBackgrounds() {

        ResponseGetAllBackgroundDto res = generateService.getAllBackgrounds();
        if (res == null) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/background/{backgroundNo}")
    public ResponseEntity<BackgroundDto> getBackground(@PathVariable("backgroundNo") Long backgroundNo) {

        BackgroundDto res = generateService.getBackground(backgroundNo);
        if (res == null) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/background")
    public ResponseEntity<?> generateBackground(@RequestHeader("X-Username") String username,
                                                @RequestBody Map<String, String> backgroundMap) {

        String background = backgroundMap.get("background");
        String res = generateService.generateBackground(username, background);
        if (res == null) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }



    @GetMapping("/pose")
    public ResponseEntity<ResponseGetAllPoseDto> getAllPoses(@RequestHeader("X-Username") String username) {

        ResponseGetAllPoseDto res = generateService.getAllPoses(username);
        if (res == null) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/pose/{poseNo}")
    public ResponseEntity<PoseDto> getPose(@PathVariable("poseNo") Long poseNo) {

        PoseDto res = generateService.getPose(poseNo);
        if (res == null) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/pose")
    public ResponseEntity<?> generatePose(@RequestBody RequestGeneratePoseDto requestGeneratePoseDto) {

        ResponseGeneratePoseDto res = generateService.generatePose(requestGeneratePoseDto);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }


}
