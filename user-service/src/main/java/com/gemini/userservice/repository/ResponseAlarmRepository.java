package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseAlarmRepository extends CrudRepository<Alarm, Long> {
}
