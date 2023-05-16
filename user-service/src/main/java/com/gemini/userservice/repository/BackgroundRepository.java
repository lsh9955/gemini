package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Background;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BackgroundRepository extends JpaRepository<Background, Long> {

    Background findByBackgroundNo(Long backgroundNo);
}
