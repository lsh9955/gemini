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
import RankingGeminiDetail from "../geminiDetail/RankingGeminiDetail";

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

interface RankingImageData {
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
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);

  // 무한 스크롤 😀
  const dummyImgs = [
    { imageUrl: "http://placeimg.com/150/200/tech", geminiPk: 1 },
    { imageUrl: "http://placeimg.com/150/200/tech", geminiPk: 2 },
    { imageUrl: "http://placeimg.com/150/200/tech", geminiPk: 3 },
    { imageUrl: "http://placeimg.com/150/200/tech", geminiPk: 4 },
    { imageUrl: "http://placeimg.com/150/200/tech", geminiPk: 5 },
    // ...
  ];

  const [images, setImages] = useState<ImageData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const dummyRankingImgs = [
    { imageUrl: "http://placeimg.com/150/200/tech", galleryNo: 1 },
    { imageUrl: "http://placeimg.com/150/200/tech", galleryNo: 2 },
    { imageUrl: "http://placeimg.com/150/200/tech", galleryNo: 3 },
    { imageUrl: "http://placeimg.com/150/200/tech", galleryNo: 4 },
    { imageUrl: "http://placeimg.com/150/200/tech", galleryNo: 5 },
    // ...
  ];
  const [dailyTop5, setDailyTop5] = useState<RankingImageData[]>([
    ...dummyRankingImgs,
  ]);
  const [weeklyTop5, setWeeklyTop5] = useState<RankingImageData[]>([
    ...dummyRankingImgs,
  ]);

  const fetchRankingData = async () => {
    const dailyRes = await axiosInstanceWithAccessToken.get(
      "/user-service/gallery/daily"
    );

    const weeklyRes = await axiosInstanceWithAccessToken.get(
      "/user-service/gallery/weekly"
    );
    console.log("랭킹 데이터 가져옵니다.");
    console.log(dailyRes.data.rankingDtos);
    console.log(weeklyRes.data.rankingDtos);
    setDailyTop5(dailyRes.data.rankingDtos);
    setWeeklyTop5(weeklyRes.data.rankingDtos);
    console.log("여기까지! 이제 뿌려주자.");
  };

  useEffect(() => {
    console.log("일간, 주간 갤러리 요청");
    fetchRankingData();

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

  const handleRankingImageClick = (pk: number) => {
    setSelectedImagePk(pk);
    setIsRankingModalOpen(true);
  };

  // 무한스크롤 불러오기
  const loadMoreImages = useCallback(async () => {
    const currentPage = page;
    try {
      console.log("무한스크롤 요청 /user-service/gallery");
      const response = await axiosInstanceWithAccessToken.get(
        "/user-service/gallery",
        {
          params: {
            page: currentPage,
            size: 16,
          },
        }
      );
      console.log("아래가 결과임");
      console.log(`${response.data.length}개`);
      console.log(response);
      console.log("위가 결과임");

      if (response.status === 200) {
        const newImages = response.data.galleryPage.content.map(
          (item: any) => ({
            imageUrl: item.imageUrl,
            geminiPk: item.galleryNo,
          })
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

  interface ImageProps {
    imageUrl: string;
    pk: number;
    onClick: () => void;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeRankingModal = () => {
    setIsRankingModalOpen(false);
  };
  // for model component 😉

  const [fetchUrlPeriod, setFetchUrlPeriod] = useState("");

  return (
    <GalleryWrap>
      <ContentWrap>
        <GalleryTitleName ref={ref}>일간 TOP 5</GalleryTitleName>
        <ImgWrap>
          {dailyTop5.slice(0, 5).map((imageData, index) => (
            <StyledImg
              key={index}
              imageUrl={imageData.imageUrl}
              geminiPk={imageData.galleryNo}
              onClick={() => {
                setFetchUrlPeriod("daily");
                handleRankingImageClick(imageData.galleryNo);
              }} // 이미지 클릭 시 handleImageClick 함수를 호출합니다.
            />
          ))}
        </ImgWrap>
        {/* <GalleryTitleName>주간 TOP 5</GalleryTitleName>
        <ImgWrap>
          {weeklyTop5.slice(0, 5).map((imageData, index) => (
            <StyledImg
              key={index}
              imageUrl={imageData.imageUrl}
              geminiPk={imageData.galleryNo}
              onClick={() => {
                setFetchUrlPeriod("weekly");
                handleRankingImageClick(imageData.galleryNo);
              }} // 이미지 클릭 시 handleImageClick 함수를 호출합니다.
            />
          ))}
        </ImgWrap> */}
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
      {isRankingModalOpen && (
        <>
          <Backdrop onClick={closeRankingModal} /> {/*  랭킹모달 */}
          <RankingGeminiDetail
            closeModal={closeRankingModal}
            selectedImagePk={selectedImagePk}
            fetchUrlPeriod={fetchUrlPeriod}
          />
        </>
      )}
    </GalleryWrap>
  );
});

export default Gallery;
