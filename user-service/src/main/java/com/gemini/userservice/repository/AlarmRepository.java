package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findTop20ByOrderByCreatedAtDesc();
}
