package com.gemini.userservice.api;

import com.gemini.userservice.dto.OrdersResponseDto;
import com.gemini.userservice.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrdersController {

    @Autowired
    private OrdersRepository ordersRepository;

    @PostMapping("/kakao")
        public ResponseEntity<OrdersResponseDto> kakaoOrder(@RequestBody )

}
