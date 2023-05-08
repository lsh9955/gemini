package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponseAlarmRepository extends JpaRepository<Alarm, Long> {
}
