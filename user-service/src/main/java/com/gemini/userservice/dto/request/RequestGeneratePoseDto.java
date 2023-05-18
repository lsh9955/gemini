package com.gemini.userservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RequestGeneratePoseDto {

    private List<Long> geminis;

    private Integer sample;

    private String backgroundUrl;
}
