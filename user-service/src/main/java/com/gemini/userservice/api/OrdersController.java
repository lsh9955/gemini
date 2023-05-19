package com.gemini.userservice.api;

import com.gemini.userservice.dto.OrdersRequestDto;
import com.gemini.userservice.dto.response.ResponseOrdersDto;
import com.gemini.userservice.repository.OrdersRepository;
import com.gemini.userservice.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-service/order")
public class OrdersController {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private OrdersService ordersService;


    @PostMapping("/kakao/single-payment")
        public ResponseEntity<ResponseOrdersDto> kakaoOrder(@RequestHeader("X-Username") String username,
                                                            @RequestBody OrdersRequestDto ordersRequestDto) {
            ResponseOrdersDto responseOrdersDto = ordersService.kakaoOrder(username, ordersRequestDto);
            return ResponseEntity.ok(responseOrdersDto);
    }

}
