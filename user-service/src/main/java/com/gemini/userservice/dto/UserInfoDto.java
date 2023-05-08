package com.gemini.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {
    private Long userPk;
    private String description;
    private String nickname;
    private String profileBackground;
    private Integer star;
    private String username;

    private String profileImgUrl;
}