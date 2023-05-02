package com.gemini.userservice.service;

import com.gemini.userservice.dto.OrdersResponseDto;
import com.gemini.userservice.entity.Orders;
import com.gemini.userservice.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersServiceImpl implements OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Override
    public OrdersResponseDto getOrderById(String merchantUid) {
        Orders orders = ordersRepository.
        return null;
    }
}
