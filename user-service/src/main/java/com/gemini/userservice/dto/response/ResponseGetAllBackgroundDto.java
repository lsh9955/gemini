package com.gemini.userservice.dto.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.gemini.userservice.dto.BackgroundDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ResponseGetAllBackgroundDto {

    private List<BackgroundDto> backgrounds;
}
