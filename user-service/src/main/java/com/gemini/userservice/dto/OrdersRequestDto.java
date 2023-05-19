package com.gemini.userservice.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class
OrdersRequestDto {
    private Integer orderStar;
    private String merchantUid;

}
