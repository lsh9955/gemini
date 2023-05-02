package com.gemini.userservice.repository;

import com.gemini.userservice.entity.UserInfo;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentsRepository {
    UserInfo findByStar(Integer star);
}
