package com.gemini.userservice.dto;

import com.gemini.userservice.entity.Gallery;
import com.gemini.userservice.entity.Gemini;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class GalleryDto {

    private Long galleryNo;

    private String imageUrl;

    public GalleryDto(Gallery gallery, Gemini gemini) {

        this.galleryNo = gallery.getGalleryNo();
        this.imageUrl = gemini.getImageUrl();
    }

}
