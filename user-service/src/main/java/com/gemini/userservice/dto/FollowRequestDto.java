package com.gemini.userservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FollowRequestDto {

    // if pk needed, revise it. 😶
    //    private Long userPk;
    private String nickname;

}