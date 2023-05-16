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
public class OtherUserProfileResponseDto {
    private String nickname;
    private String description;
    private Long follower;
    private Long following;
//    private Integer star; // eliminated. watching other user's star is not allowed.

    private String profileUrl;

    private Boolean isFollowing;
    private List<GeminiDto> geminis;
}
