package com.gemini.userservice.service;

import com.gemini.userservice.dto.OrdersResponseDto;

public interface OrdersService {
    OrdersResponseDto getOrderById(String merchantUid);
}
