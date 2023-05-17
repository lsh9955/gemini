package com.gemini.userservice.repository;

import com.gemini.userservice.entity.AlarmData;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlarmDataRepository extends CrudRepository<AlarmData, Long> {
}
