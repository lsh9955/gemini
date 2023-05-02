package com.gemini.userservice.service;

import com.gemini.userservice.dto.OrdersReqeustDto;
import com.gemini.userservice.dto.OrdersResponseDto;
import com.gemini.userservice.entity.Orders;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.OrdersRepository;
import com.gemini.userservice.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersServiceImpl implements OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public OrdersResponseDto kakaoOrder(OrdersReqeustDto requestDto, String username) {
        UserInfo userInfo = userInfoRepository.findByUsername(username);

        // 기존 별 개수 및 추가할 별 개수 조회
        Integer oldTotalStars = userInfo.getStar();
        Integer addStars = requestDto.getOrderStar();

        // 별 개수 총합 계산 후 저장
        Integer newTotalStar = oldTotalStars + addStars;
        userInfo.setStar(newTotalStar);
        userInfoRepository.save(userInfo);

        // 새로운 주문 정보 저장
        Orders orders = Orders.builder()
                .star(requestDto.getOrderStar())
                .merchantUid(requestDto.getMerchantUid())
                .build();
        ordersRepository.save(orders);

        // client에 보낼 DTO 생성 및 반환
        OrdersResponseDto ordersResponseDto = OrdersResponseDto.builder()
                .star(newTotalStar)
                .build();
        return ordersResponseDto;


    }


//    @Override
//    public void orderSave(OrdersReqeustDto ordersReqeustDto){
//
//
//    }
}
