package com.gemini.userservice.service;

import com.gemini.userservice.dto.OrdersRequestDto;
import com.gemini.userservice.dto.OrdersResponseDto;


public interface OrdersService {
//    void kakaoOrder(OrdersReqeustDto ordersReqeustDto);
    OrdersResponseDto kakaoOrder(OrdersRequestDto requestDto);


}
