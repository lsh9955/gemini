package com.gemini.userservice.dto.response;

import com.gemini.userservice.entity.Gallery;
import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.Tag;
import com.gemini.userservice.entity.UserInfo;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ResponseGalleryDetailDto {

    private String nickname;

    private String profileImage;

    private String geminiName;

    private String geminiImage;

    private String geminiDescription;

    private Integer totalLike;

    private Boolean isLiked;

    private List<String> tags; //몽고

    public ResponseGalleryDetailDto(UserInfo userInfo, Gemini gemini, Boolean isLiked, List<String> tags) {

        this.nickname = userInfo.getNickname();
        this.profileImage = userInfo.getProfileImgUrl();
        this.geminiName = gemini.getName();
        this.geminiImage = gemini.getImageUrl();
        this.geminiDescription = gemini.getDescription();
        this.totalLike = gemini.getTotalLike();
        this.isLiked = isLiked;
        this.tags = tags;
    }
}
