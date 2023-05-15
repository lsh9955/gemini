package com.gemini.userservice.dto.response;

import com.gemini.userservice.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseTagDto {

    private List<TagDto> tags;

}
