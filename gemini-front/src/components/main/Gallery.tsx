import React, {
  useEffect,
  useState,
  MutableRefObject,
  forwardRef,
  useCallback,
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
  StyledImg,
} from "./Gallery.styles";
import MyProfileContentBody from "../profile/myprofile/MyProfileContentBody";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";
import { ImageWrapper } from "../profile/myprofile/MyProfileContentBody.styles";
import { Backdrop } from "../geminiDetail/UserGeminiDetail.styles";
import UserGeminiDetail from "../geminiDetail/UserGeminiDetail";
import { number } from "yargs";

interface Image {
  galleryNo: number;
  imageUrl: string;
}
interface GalleryProps {
  // 다른 속성들...
  ref: MutableRefObject<any>;
}

interface ImageData {
  imageUrl: string;
  geminiPk: number;
}

interface ImageData2 {
  imageUrl: string;
  galleryNo: number;
}

const Gallery = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [totalGallery, setTotalGallery] = useState<number>(0);

  const imgArr = [
    "https://firebasestorage.googleapis.com/v0/b/crudtest-e658b.appspot.com/o/pic3.png?alt=media&token=e7075843-674e-4c06-94c8-0db5052cdfbc",
    "https://firebasestorage.googleapis.com/v0/b/crudtest-e658b.appspot.com/o/pic2.png?alt=media&token=33b1f0ea-4e7d-4519-8064-33b1dfc4b2e5",
    "https://firebasestorage.googleapis.com/v0/b/crudtest-e658b.appspot.com/o/pic1.png?alt=media&token=f619b034-5f69-42cb-904f-c3c2304e8556",
  ];

  const [selectedImagePk, setSelectedImagePk] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 무한 스크롤 😀
  const dummyImgs = [
    { imageUrl: "http://placeimg.com/150/200/tech", geminiPk: 1 },
    { imageUrl: "http://placeimg.com/150/200/tech", geminiPk: 2 },
    { imageUrl: "http://placeimg.com/150/200/tech", geminiPk: 3 },
    { imageUrl: "http://placeimg.com/150/200/tech", geminiPk: 4 },
    { imageUrl: "http://placeimg.com/150/200/tech", geminiPk: 5 },
    // ...
  ];

  const [images, setImages] = useState<ImageData[]>([...dummyImgs]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const [weeklyTop5, setWeeklyTop5] = useState<ImageData[]>([...dummyImgs]);
  const [monthlyTop5, setMonthlyTop5] = useState<ImageData[]>([...dummyImgs]);

  useEffect(() => {
    console.log("일간, 주간 갤러리 요청");
    const dailyRes = axiosInstanceWithAccessToken.get(
      "/user-service/gallery/daily"
    );
    const weeklyRes = axiosInstanceWithAccessToken.get(
      "/user-service/gallery/weekly"
    );

    // Dto 보니까 아래처럼 들어와서 바꿔야함.
    // interface ImageData2 {
    //   imageUrl: string;
    //   galleryNo: number;
    // }
  }, []);
  // 무한스크롤 😀

  const handleImageClick = (pk: number) => {
    setSelectedImagePk(pk);
    setIsModalOpen(true);
  };

  // 무한스크롤 불러오기
  const loadMoreImages = useCallback(async () => {
    try {
      console.log("무한스크롤 요청 /user-service/gallery");
      const response = await axiosInstanceWithAccessToken.get(
        "/user-service/gallery",
        {
          params: {
            page: page,
            size: 16,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        const newImages = response.data.galleryPage.content.map(
          (item: any) => item.imageUrl
        );
        setImages((prevImages) => [...prevImages, ...newImages]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(newImages.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      setHasMore(false);
    }
  }, [page]);

  useEffect(() => {
    loadMoreImages();
  }, [loadMoreImages]);

  // 전체 이미지 개수 불러오기
  useEffect(() => {
    axiosInstanceWithAccessToken
      .get("/user-service/gallery/total")
      .then((response) => {
        console.log(response.data);
        setTotalGallery(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 스크롤 이벤트 핸들러
  // const handleScroll = () => {
  //   // 스크롤이 바닥에 닿았을 때
  //   if (
  //     window.innerHeight + window.scrollY >=
  //     document.body.offsetHeight * 0.8
  //   ) {
  //     fetchMoreImages();
  //   }
  // };

  // 추가 이미지 불러오기
  // const fetchMoreImages = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  interface ImageProps {
    imageUrl: string;
    pk: number;
    onClick: () => void;
  }

  // for model component 😉 commented out below are already exist
  // const [selectedImagePk, setSelectedImagePk] = useState<number | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleImageClick = (pk: number) => {
  //   setSelectedImagePk(pk);
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // for model component 😉

  return (
    <GalleryWrap>
      {/* <GalleryTitle ref={ref}>
        전체 둘러보기 {totalGallery}개의 이미지
      </GalleryTitle> */}
      <ContentWrap>
        <GalleryTitleName ref={ref}>일간 TOP 5</GalleryTitleName>
        <ImgWrap>
          {weeklyTop5.map((imageData, index) => (
            <StyledImg
              key={index}
              imageUrl={imageData.imageUrl}
              geminiPk={imageData.geminiPk}
              onClick={() => handleImageClick(imageData.geminiPk)} // 이미지 클릭 시 handleImageClick 함수를 호출합니다.
            />
          ))}
        </ImgWrap>
        <GalleryTitleName>주간 TOP 5</GalleryTitleName>
        <ImgWrap>
          {monthlyTop5.map((imageData, index) => (
            <StyledImg
              key={index}
              imageUrl={imageData.imageUrl}
              geminiPk={imageData.geminiPk}
              onClick={() => handleImageClick(imageData.geminiPk)} // 이미지 클릭 시 handleImageClick 함수를 호출합니다.
            />
          ))}
        </ImgWrap>
        <GalleryTitleName>
          전체 둘러보기 {totalGallery ? totalGallery : 0}개의 이미지
        </GalleryTitleName>
        <MyProfileContentBody
          images={images}
          hasMore={hasMore}
          loadMoreImages={loadMoreImages}
          onImageClick={handleImageClick} // 이 부분을 추가하세요.
        />

        {/* <EmptyBlock></EmptyBlock> */}
      </ContentWrap>
      {isModalOpen && (
        <>
          <Backdrop onClick={closeModal} /> {/*  이부분 추가.*/}
          <UserGeminiDetail
            closeModal={closeModal}
            selectedImagePk={selectedImagePk}
          />
        </>
      )}
    </GalleryWrap>
  );
});

export default Gallery;
