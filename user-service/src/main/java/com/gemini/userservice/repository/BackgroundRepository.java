package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Background;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;


@Repository
public interface BackgroundRepository extends JpaRepository<Background, Long> {

    Background findByBackgroundNo(Long backgroundNo);

    List<Background> findAllByOrderByBackgroundNoDesc();

    Optional<Background> findByImageUrl(String imageUrl);

}
