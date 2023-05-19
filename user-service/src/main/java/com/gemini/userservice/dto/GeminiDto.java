package com.gemini.userservice.dto;
import com.gemini.userservice.entity.Gallery;
import com.gemini.userservice.entity.Gemini;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GeminiDto {
    private Long geminiPk;
    private String image;
    private Long userPk;

    public GeminiDto(Gemini gemini) {

        this.geminiPk = gemini.getGeminiNo();
        this.image = gemini.getImageUrl();
        this.userPk = gemini.getUserInfo().getUserPk();
    }
}