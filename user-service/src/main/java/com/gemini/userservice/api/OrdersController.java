package com.gemini.userservice.api;

import com.gemini.userservice.dto.OrdersRequestDto;
import com.gemini.userservice.dto.response.ResponseOrdersDto;
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
        public ResponseEntity<ResponseOrdersDto> kakaoOrder(@RequestBody OrdersRequestDto ordersRequestDto) {
            System.out.println(ordersRequestDto.toString());
            ResponseOrdersDto responseOrdersDto = ordersService.kakaoOrder(ordersRequestDto);
            return ResponseEntity.ok(responseOrdersDto);
    }

}
