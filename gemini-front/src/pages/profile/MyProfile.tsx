import React, { FC, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenPayModalButton from "../../components/profile/pay/button/OpenPayModalButton";
import PayButton from "../../components/profile/pay/modal/PayModal";
import {
  Desc,
  EditButton,
  EditPenButton,
  FollowingAndPayWrappter,
  FollowingTextWrapper,
  MyBgImg,
  MyInfoContentWrapper,
  MyInfoSpace,
  MyInfoWrapper,
  MyProfileContentBodyWrapper,
  MyProfileContentTitle,
  MyProfileContentTitleWrapper,
  MyProfileContentWrapper,
  MyProfileImg,
  MyProfileTextWrapper,
  MyProfileWrapper,
  Nickname,
  NumText,
} from "./UserProfile.styles";
import MyProfileContentBody from "../../components/profile/myprofile/MyProfileContentBody";
import { getInfScrollImgLength } from "./UserProfile";
import axios from "axios";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";
import AriesDummyProfile from "../../assets/img/AriesDummyProfile.png";
import { async } from "q";
import UserGeminiDetail from "../../components/geminiDetail/UserGeminiDetail";
import MyGeminiDetail from "../../components/geminiDetail/MyGeminiDetail";
import { Backdrop } from "../../components/geminiDetail/UserGeminiDetail.styles";
import { AppStore } from "../../store/store";
import MyProfileContentBodyR from "../../components/profile/myprofile/MyProfileContentBodyR";

import PayModal from "../../components/profile/pay/modal/PayModal";

import MyProfileContentBodyTRPG from "../../components/profile/myprofile/MyProfileContentBodyTRPG";
// import { MyProfileWrapper } from "../../components/profile/myprofile/MyProfileComp.styles";

const MyProfile: FC = () => {
  const history = useHistory();
  const reduxNickname = useSelector((state: AppStore) => state.user.nickname);

  const [profileImg, setProfileImg] = useState<string>(AriesDummyProfile);
  const [nickname, setNickname] = useState<string>("기본 닉네임");
  const [desc, setDesc] = useState<string>(
    "자기소개 부분: 내가 좋아하는 세계관, 캐릭터 등등을 적어보자. 기본 자기소개"
  );
  const [followerNum, setFollowerNum] = useState<number>(0);
  const [followingNum, setFollowingNum] = useState<number>(0);
  const [starPoint, setStarPoint] = useState<number>(10);

  const getMyinfo = async () => {
    console.log("내 정보를 가져옵니다.");
    const userInfoRes = await axiosInstanceWithAccessToken.get(
      "/user-service/profile/login"
    );
    console.log(reduxNickname);
    console.log("닉네임으로 팔로잉 찾아봅니다.");

    const followingRes = await axiosInstanceWithAccessToken.post(
      `/user-service/profile/followcount`,
      { nickname: reduxNickname }
    );

    console.log("내정보");
    console.log(userInfoRes.data.description);
    //     `description: "띄어쓰기 되지"
    // nickname: "띄어쓰기 되나"
    // profileBackground: null
    // profileImgUrl: "2"
    // star: 10000
    // userPk: 9
    // username: "google_12346"`
    setProfileImg(userInfoRes.data.profileImgUrl);
    setNickname(userInfoRes.data.nickname);
    setDesc(userInfoRes.data.description);
    setStarPoint(userInfoRes.data.star);

    setFollowerNum(followingRes.data.followersCount);
    setFollowingNum(followingRes.data.followingsCount);
  };
  useEffect(() => {
    getMyinfo();
  }, []);

  // for infinite scroll 😀
  const dummyImgs = [
    {
      image:
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
      geminiPk: 1,
      userPk: 1,
    },
    {
      image:
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/adol.png",
      geminiPk: 2,
      userPk: 1,
    },
    // { image: "http://placeimg.com/150/200/tech", geminiPk: 3, userPk: 1 },
    // { image: "http://placeimg.com/150/200/tech", geminiPk: 4, userPk: 1 },
    // { image: "http://placeimg.com/150/200/tech", geminiPk: 5, userPk: 1 },
    // ...
  ];

  interface ImageData {
    imageUrl: string;
    geminiPk: number;
  }

  interface ImageDataMine {
    geminiPk: number;
    image: string;
    userPk: number;
    // imageUrl: string;
    // geminiPk: number;
  }

  const [images, setImages] = useState<ImageDataMine[]>([...dummyImgs]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const infScrollImgLength = getInfScrollImgLength(images.length);
  const minHeight = `${39.2 + infScrollImgLength * 20}vh`; // 동적높이적용
  // const minHeight = `${100 + infScrollImgLength * 20}vh`; // 동적높이적용

  const loadMoreImages = useCallback(async () => {
    const currentPage = page;

    try {
      const response = await axiosInstanceWithAccessToken.get(
        "/user-service/gallery/mygeminis",
        {
          params: {
            page: currentPage,
            size: 16,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        const newImages = response.data.geminiPage.content.map(
          // (item: any) => item.imageUrl
          (item: any) => ({
            image: item.image,
            geminiPk: item.geminiPk,
            userPk: item.userPk,
          })
        );
        setImages((prevImages) => [...prevImages, ...newImages]);
        // setImages((prevImages) => [
        //   ...prevImages.map(
        //     (item: ImageDataMine): ImageData => ({
        //       imageUrl: item.image,
        //       geminiPk: item.geminiPk,
        //     })
        //   ),
        //   ...newImages.map(
        //     (item: ImageDataMine): ImageData => ({
        //       imageUrl: item.image,
        //       geminiPk: item.geminiPk,
        //     })
        //   ),
        // ]);

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
  }, [loadMoreImages]); // 그냥 한번에 다 불러오자 😥
  // for infinite scroll 😀

  // for switching Inf scroll content 🙄
  const [currentView, setCurrentView] = useState<"Gemini" | "TRPG">("Gemini");
  const handleGeminiClick = () => setCurrentView("Gemini");
  const handleTRPGClick = () => setCurrentView("TRPG");

  interface memoriesData {
    poseNo: number;
    background: string;
    poseImages: string[];
    // onClick: () => void;
  }

  const dummyMemories = [
    {
      poseNo: 1,
      background:
        "https://mygemini.s3.amazonaws.com/gemini/20230516_042947103333_background.png",
      poseImages: [
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
      ],
      // onClick: () => {},
    },
    {
      poseNo: 2,
      background:
        "https://mygemini.s3.amazonaws.com/gemini/20230516_042947103333_background.png",
      poseImages: [
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
      ],
      // onClick: () => {},
    },
    {
      poseNo: 3,
      background:
        "https://mygemini.s3.amazonaws.com/gemini/20230516_042947103333_background.png",
      poseImages: [
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
      ],
      // onClick: () => {},
    },
    {
      poseNo: 4,
      background:
        "https://mygemini.s3.amazonaws.com/gemini/20230516_042947103333_background.png",

      poseImages: [
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
        "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
      ],
      // onClick: () => {},
    },

    // ...
  ];
  const [memories, setMemories] = useState<memoriesData[]>([...dummyMemories]);
  const [hasMoreMemories, setHasMoreMemories] = useState(true);
  const handleMemoryClick = () => {};

  useEffect(() => {
    const fetchMemoryRes = async () => {
      const MemoryRes = await axiosInstanceWithAccessToken.get(
        "/user-service/generate/pose"
      );
      console.log("인생네컷 메모리 데이터 가져왔습니다.");
      console.log(MemoryRes);
      console.log(MemoryRes.data);
      console.log(MemoryRes.data.data);
      setMemories(MemoryRes.data.poseDtos);
    };
    fetchMemoryRes();
  }, []);

  // for switching Inf scroll content 🙄

  // for Modal component 😀
  const [selectedImagePk, setSelectedImagePk] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (pk: number) => {
    setSelectedImagePk(pk);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // for Modal component 😀

  // 페이 모달
  // useselector로 star 값 불러오기
  const [payModal, showPayModal] = useState(false);
  const reduxStar = useSelector((state: AppStore) => state.user.star);

  const [paymentResult, setPaymentResult] = useState<any>(reduxStar);

  const openPayModal = () => {
    showPayModal(true);
  };

  const closePayModal = () => {
    showPayModal(false);
    setStarPoint(paymentResult);
  };

  return (
    <>
      <MyProfileWrapper minHeight={minHeight}>
        <MyInfoWrapper>
          <MyBgImg></MyBgImg>
          <MyInfoSpace></MyInfoSpace>
          <MyInfoContentWrapper>
            <MyProfileImg imgUrl={profileImg}>
              {/* AriesDummyProfile */}
              {/* <EditPenButton></EditPenButton> */}
            </MyProfileImg>
            <MyProfileTextWrapper>
              <Nickname>{nickname}</Nickname>
              <Desc>{desc}</Desc>
              {/* <EditButton>수정하기</EditButton> */}
            </MyProfileTextWrapper>
            <FollowingAndPayWrappter>
              <FollowingTextWrapper>
                <NumText>
                  {followerNum}
                  <br />
                  팔로워
                </NumText>
                <NumText>
                  {followingNum}
                  <br />
                  팔로잉
                </NumText>
                <NumText>
                  {paymentResult}
                  <br />
                  별조각
                </NumText>
              </FollowingTextWrapper>
              {/* <PayButton /> */}
              <OpenPayModalButton openPayModal={openPayModal} />
            </FollowingAndPayWrappter>
          </MyInfoContentWrapper>
        </MyInfoWrapper>
        <MyProfileContentWrapper minHeight={minHeight}>
          <MyProfileContentTitleWrapper>
            <MyProfileContentTitle
              active={currentView === "Gemini"}
              onClick={handleGeminiClick}
            >
              {nickname}님의 Gemini
            </MyProfileContentTitle>
            {/* <MyProfileContentTitle>|</MyProfileContentTitle> */}
            <MyProfileContentTitle
              active={currentView === "TRPG"}
              onClick={handleTRPGClick}
            >
              TRPG 추억로그
            </MyProfileContentTitle>
          </MyProfileContentTitleWrapper>
          <MyProfileContentBodyWrapper minHeight={minHeight}>
            {currentView === "Gemini" ? (
              <MyProfileContentBodyR
                images={images}
                hasMore={hasMore}
                loadMoreImages={loadMoreImages}
                onImageClick={handleImageClick} // 이 부분을 추가하세요.
              />
            ) : (
              <MyProfileContentBodyTRPG
                images={memories}
                onImageClick={handleMemoryClick}
                // TRPGComponent에 필요한 props
              />
            )}
            {isModalOpen && (
              <>
                <Backdrop onClick={closeModal} /> {/*  이부분 추가.*/}
                <MyGeminiDetail
                  closeModal={closeModal}
                  selectedImagePk={selectedImagePk}
                  setProfileImg={setProfileImg}
                />
              </>
            )}
          </MyProfileContentBodyWrapper>
        </MyProfileContentWrapper>
      </MyProfileWrapper>
      {payModal && (
        <PayModal onClose={closePayModal} setPaymentResult={setPaymentResult} />
      )}
    </>
  );
};
export default MyProfile;
