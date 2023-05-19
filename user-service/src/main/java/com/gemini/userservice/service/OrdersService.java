package com.gemini.userservice.service;

import com.gemini.userservice.dto.OrdersRequestDto;
import com.gemini.userservice.dto.response.ResponseOrdersDto;


public interface OrdersService {
    ResponseOrdersDto kakaoOrder(String username, OrdersRequestDto requestDto);

}
