package com.gemini.userservice.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestGalleryEnrollmentDto {
    private Long geminiPk;
    private Boolean isPublic;

}
