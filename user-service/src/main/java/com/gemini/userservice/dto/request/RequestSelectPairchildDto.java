package com.gemini.userservice.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RequestSelectPairchildDto {
    private String nickname;
    private String description;
    private String profile_img_url;
}
