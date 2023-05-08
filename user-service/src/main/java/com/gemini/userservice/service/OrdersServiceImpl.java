package com.gemini.userservice.service;

import com.gemini.userservice.dto.OrdersRequestDto;
import com.gemini.userservice.dto.response.ResponseOrdersDto;
import com.gemini.userservice.entity.Orders;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.OrdersRepository;
import com.gemini.userservice.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersServiceImpl implements OrdersService {

    @Autowired
    private final OrdersRepository ordersRepository;

    @Autowired
    private final UserInfoRepository userInfoRepository;


    public OrdersServiceImpl(OrdersRepository ordersRepository, UserInfoRepository userInfoRepository) {
        this.ordersRepository = ordersRepository;
        this.userInfoRepository = userInfoRepository;
    }


    @Override
    public ResponseOrdersDto kakaoOrder(String username, OrdersRequestDto requestDto) {
            // 회원정보 찾아오기
            UserInfo userInfo = userInfoRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 기존 별 개수 및 추가할 별 개수 조회
            Integer oldTotalStars = userInfo.getStar();
            Integer addStars = requestDto.getOrderStar();

            // 별 개수 총합 계산 후 저장
            Integer newTotalStar = oldTotalStars + addStars;
            userInfo.updateStar(newTotalStar);
            userInfoRepository.save(userInfo);

            // 새로운 주문 정보 저장
            Orders orders = Orders.builder()
                    .star(requestDto.getOrderStar())
                    .merchantUid(requestDto.getMerchantUid())
                    .userInfo(userInfo)
                    .build();
            ordersRepository.save(orders);

            // client에 보낼 DTO 생성 및 반환
            return ResponseOrdersDto.builder()
                    .star(newTotalStar)
                    .build();
        }
    }
