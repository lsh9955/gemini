package com.gemini.userservice.dto;

import lombok.AllArgsConstructor;
        import lombok.Builder;
        import lombok.Data;
        import lombok.NoArgsConstructor;

        import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PairchildsResponseDto {
    private List<PairchildDto> pairchilds;
}