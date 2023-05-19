package com.gemini.userservice.dto.response;

import com.gemini.userservice.dto.RankingDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResponseRankingDto {

    private List<RankingDto> rankingDtos;
}
