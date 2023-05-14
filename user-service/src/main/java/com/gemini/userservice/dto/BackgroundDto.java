package com.gemini.userservice.dto;

import com.gemini.userservice.entity.Background;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class BackgroundDto {

    private Long backgroundNo;

    private String imageUrl;

    public BackgroundDto(Background background) {

        this.backgroundNo = background.getBackgroundNo();
        this.imageUrl = background.getImageUrl();
    }
}
