package com.gemini.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PoseDto {

    private Long poseNo;

    private List<String> poseImages;

}
