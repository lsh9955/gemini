package com.gemini.userservice.dto.response;

import com.gemini.userservice.dto.PoseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseGetAllPoseDto {

    private List<PoseDto> poseDtos;
}
