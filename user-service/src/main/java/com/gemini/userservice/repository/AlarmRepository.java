package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface AlarmRepository extends CrudRepository<Alarm, Long> {




//    Alarm findTopByOrderByAlarmIdDesc();
//
//
//    @Query("SELECT a FROM Alarm a WHERE a.nickname = :nickname ORDER BY a.createdAt DESC")
//    Optional<List<Alarm>> findByOrderByCreatedAtDesc(String nickname);
//
    Alarm findByAlarmId(Long alarmId);
//
//    Optional<List<Alarm>> findByNickname(String nickname);
//
//    int countByNickname(String finalNickname);
//
//    @Query("SELECT MAX(a.alarmId) FROM Alarm a WHERE a.nickname = :nickname")
//    Optional<List<Alarm>> findLastAlarmIdByNickname(String nickname);
}