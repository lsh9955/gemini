package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Category;
import com.gemini.userservice.entity.Follow;
import com.gemini.userservice.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByCategoryNo(Long categoryNo);
}
