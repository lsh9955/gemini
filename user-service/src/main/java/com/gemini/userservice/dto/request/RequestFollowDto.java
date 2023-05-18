package com.gemini.userservice.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestFollowDto {

    // if pk needed, revise it. 😶
    //    private Long userPk;
    private String nickname;

}