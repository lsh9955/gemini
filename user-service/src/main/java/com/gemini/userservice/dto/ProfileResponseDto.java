package com.gemini.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponseDto {
    private String nickname;
    private String description;
    private long follower;
    private long following;
    private int star;
    private List<GeminiDto> geminis;
}