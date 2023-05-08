import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { GalleryWrapper, GalleryItem, GalleryTitle } from "./Gallery.styles";

interface Image {
  galleryNo: number;
  imageUrl: string;
}

const Gallery: FC = () => {
  const [page, setPage] = useState<number>(0);
  const GALLERY_PAGE_SIZE = 5;
  const [images, setImages] = useState<Image[]>([]);
  const [totalGallery, setTotalGallery] = useState<number>(0);
  const headers = {
    "X-Username": "gemini",
  };

  // 전체 이미지 불러오기
  useEffect(() => {
    const params = {
      page: `${page}`,
      size: `${GALLERY_PAGE_SIZE}`,
    };

    axios
      .get("http://192.168.31.73:8081/user-service/gallery", {
        headers: headers,
        params: params,
      })
      .then((response) => {
        console.log(response);
        const imageUrls: Image[] = response.data.galleryPage.content.map(
          (image: Image) => ({
            galleryNo: image.galleryNo,
            imageUrl: image.imageUrl,
          })
        );
        setImages((prevImages) => [...prevImages, ...imageUrls]);
      })
      .catch((error) => {
        console.log(error);
        // 만약 이미지를 불러올 수 없을 때, '이미지를 불러 올 수 없습니다'를 띄울 것
      });
  }, [page]);

  // 전체 이미지 카운트

  useEffect(() => {
    axios
      .get("http://192.168.31.73:8081/user-service/gallery/total", {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        setTotalGallery(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // 스크롤이 바닥에 닿았을 때
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight * 0.8
    ) {
      fetchMoreImages();
    }
  };

  // 추가 이미지 불러오기
  const fetchMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <GalleryTitle>전체 둘러보기 {totalGallery}개의 이미지</GalleryTitle>
      <GalleryWrapper>
        {images.map((image: Image) => (
          <div key={image.galleryNo}>
            <GalleryItem src={image.imageUrl} />
          </div>
        ))}
      </GalleryWrapper>
    </>
  );
};

export default Gallery;
