package com.gemini.userservice.dto.response;

import com.gemini.userservice.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ResponseDefaultDto {

    private List<TagDto> defaultSetting;
}
