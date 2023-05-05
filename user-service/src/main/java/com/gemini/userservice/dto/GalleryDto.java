package com.gemini.userservice.dto;

import com.gemini.userservice.entity.Gallery;
import com.gemini.userservice.entity.Gemini;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class GalleryDto {

    private Long galleryNo;

    private String imageUrl;

    public GalleryDto(Gallery gallery, Gemini gemini) {

        this.galleryNo = gallery.getGalleryNo();
        this.imageUrl = gemini.getImageUrl();
    }

}
