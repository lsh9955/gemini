package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {


    Alarm findTopByOrderByAlarmIdDesc();


    @Query("SELECT a FROM Alarm a WHERE a.nickname = :nickname ORDER BY a.createdAt DESC")
    Optional<List<Alarm>> findByOrderByCreatedAtDesc(String nickname);

    @Query("SELECT a FROM Alarm a WHERE a.alarmId = :alarmId")
    Alarm findAlarmById(Long alarmId);

    Optional<List<Alarm>> findByNickname(String nickname);

    int countByNickname(String finalNickname);

    @Query("SELECT MAX(a.alarmId) FROM Alarm a WHERE a.nickname = :nickname")
    Optional<List<Alarm>> findLastAlarmIdByNickname(String nickname);
}