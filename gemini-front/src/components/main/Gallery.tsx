import React, {
  useEffect,
  useState,
  MutableRefObject,
  forwardRef,
} from "react";
import axios from "axios";
import {
  GalleryWrapper,
  GalleryItem,
  GalleryTitle,
  GalleryTitleName,
  EmptyBlock,
  GalleryWrap,
  ContentWrap,
  ImgWrap,
} from "./Gallery.styles";

interface Image {
  galleryNo: number;
  imageUrl: string;
}
interface GalleryProps {
  // 다른 속성들...
  ref: MutableRefObject<any>;
}

const Gallery = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [page, setPage] = useState<number>(0);
  const GALLERY_PAGE_SIZE = 5;
  const [images, setImages] = useState<Image[]>([]);
  const [totalGallery, setTotalGallery] = useState<number>(0);
  const headers = {
    "X-Username": "gemini",
  };
  //임시 이미지 요소들(나중에 제거할 것)
  const imgArr = [
    "https://firebasestorage.googleapis.com/v0/b/crudtest-e658b.appspot.com/o/pic3.png?alt=media&token=e7075843-674e-4c06-94c8-0db5052cdfbc",
    "https://firebasestorage.googleapis.com/v0/b/crudtest-e658b.appspot.com/o/pic2.png?alt=media&token=33b1f0ea-4e7d-4519-8064-33b1dfc4b2e5",
    "https://firebasestorage.googleapis.com/v0/b/crudtest-e658b.appspot.com/o/pic1.png?alt=media&token=f619b034-5f69-42cb-904f-c3c2304e8556",
  ];

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
    <GalleryWrap>
      {/* <GalleryTitle ref={ref}>
        전체 둘러보기 {totalGallery}개의 이미지
      </GalleryTitle> */}
      <ContentWrap>
        <GalleryTitleName ref={ref}>주간 TOP 5</GalleryTitleName>
        <ImgWrap>
          {Array(5)
            .fill("")
            .map(() => {
              return (
                <img src={imgArr[Math.floor(Math.random() * 3)]} alt="이미지" />
              );
            })}
        </ImgWrap>
        <GalleryTitleName>월간 TOP 5</GalleryTitleName>
        <ImgWrap>
          {Array(5)
            .fill("")
            .map(() => {
              return (
                <img src={imgArr[Math.floor(Math.random() * 3)]} alt="이미지" />
              );
            })}
        </ImgWrap>
        <GalleryTitleName>전체 둘러보기 120개의 이미지</GalleryTitleName>
        <ImgWrap>
          {Array(5)
            .fill("")
            .map(() => {
              return (
                <img src={imgArr[Math.floor(Math.random() * 3)]} alt="이미지" />
              );
            })}
        </ImgWrap>
        {/* <GalleryWrapper>
        {images.map((image: Image) => (
          <div key={image.galleryNo}>
            <GalleryItem src={image.imageUrl} />
          </div>
        ))}
      </GalleryWrapper> */}
        <EmptyBlock></EmptyBlock>
      </ContentWrap>
    </GalleryWrap>
  );
});

export default Gallery;
