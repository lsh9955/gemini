package com.gemini.userservice.api;

import com.gemini.userservice.dto.OrdersRequestDto;
import com.gemini.userservice.dto.OrdersResponseDto;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.OrdersRepository;
import com.gemini.userservice.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrdersController {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/kakao/single-payment")
        public ResponseEntity<OrdersResponseDto> kakaoOrder(OrdersRequestDto ordersRequestDto, UserInfo userInfo) {
            String username = userInfo.getUsername();
            OrdersResponseDto ordersResponseDto = ordersService.kakaoOrder(ordersRequestDto, username);
            return ResponseEntity.ok(ordersResponseDto);
    }

}
