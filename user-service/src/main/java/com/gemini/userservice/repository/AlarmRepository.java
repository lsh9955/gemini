package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {


    Alarm findTopByOrderByIdDesc();


    @Query("SELECT a FROM Alarm a WHERE a.nickname = :nickname ORDER BY a.createdAt DESC")
    Optional<List<Alarm>> findByOrderByCreatedAtDesc(String nickname);

    Alarm findAlarmById(Long alarmId);

}