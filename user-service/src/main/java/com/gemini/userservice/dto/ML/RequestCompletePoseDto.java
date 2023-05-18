package com.gemini.userservice.dto.ML;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RequestCompletePoseDto {

    private List<Long> geminis;

    private List<String> imageUrls;

    private String backgroundUrl;
}
