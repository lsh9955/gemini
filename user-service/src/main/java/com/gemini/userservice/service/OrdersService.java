package com.gemini.userservice.service;

import com.gemini.userservice.dto.OrdersReqeustDto;
import com.gemini.userservice.dto.OrdersResponseDto;


public interface OrdersService {
//    void kakaoOrder(OrdersReqeustDto ordersReqeustDto);
    OrdersResponseDto kakaoOrder(OrdersReqeustDto reqeustDto, String username);


}
