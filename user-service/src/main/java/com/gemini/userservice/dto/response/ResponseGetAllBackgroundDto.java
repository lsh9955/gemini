package com.gemini.userservice.dto.response;

import com.gemini.userservice.dto.BackgroundDto;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class ResponseGetAllBackgroundDto {

    private List<BackgroundDto> backgrounds;
}
