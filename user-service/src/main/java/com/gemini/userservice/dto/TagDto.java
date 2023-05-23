package com.gemini.userservice.dto;

import com.gemini.userservice.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TagDto {

    private Long tagId;

    private String koreanName;

    private String ImgUrl;

    private Long categoryId;

    public TagDto(Tag tag){

        this.tagId = tag.getTagNo();
        this.koreanName = tag.getName();
        this.ImgUrl = tag.getImageUrl();
        this.categoryId = tag.getCategoryNo().getCategoryNo();
    }
}
