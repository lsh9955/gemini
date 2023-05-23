package com.gemini.userservice.repository;

import com.gemini.userservice.entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    Gallery findByGalleryNo(Long galleryNo);
}
