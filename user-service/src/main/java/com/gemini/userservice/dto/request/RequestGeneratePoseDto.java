package com.gemini.userservice.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class RequestGeneratePoseDto {

    private List<Long> geminis;

    private List<String> users;

    private Long sample;
}
