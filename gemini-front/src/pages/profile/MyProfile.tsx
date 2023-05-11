import React, { FC, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
import axios from "axios";
import { getInfScrollImgLength } from "./UserProfile";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";
import { async } from "q";
// import { MyProfileWrapper } from "../../components/profile/myprofile/MyProfileComp.styles";

const MyProfile: FC = () => {
  const history = useHistory();

  const [nickname, setNickname] = useState<string>("내 닉네임");
  const [desc, setDesc] = useState<string>(
    "자기소개 부분: 내가 좋아하는 세계관, 캐릭터 등등을 적어보자 자  최대 몇글자로 하는게 좋을까? 넘기면 ...으로 만들까?"
  );
  const [followerNum, setFollowerNum] = useState<number>(0);
  const [followingNum, setFollowingNum] = useState<number>(0);
  const [starPoint, setStarPoint] = useState<number>(10);

  const getMyinfo = async () => {
    const res = await axiosInstanceWithAccessToken.get(
      "/user-service/profile/login"
    );
    console.log("내정보");
    console.log(res.data.description);
    //     `description: "띄어쓰기 되지"
    // nickname: "띄어쓰기 되나"
    // profileBackground: null
    // profileImgUrl: "2"
    // star: 10000
    // userPk: 9
    // username: "google_12346"`
    setNickname(res.data.nickname);
    setDesc(res.data.description);
    setStarPoint(res.data.star);
  };
  useEffect(() => {
    getMyinfo();
  }, []);

  // for infinite scroll 😀
  const dummyImgs = [
    "http://placeimg.com/150/200/tech",
    "http://placeimg.com/150/200/tech",
    "http://placeimg.com/150/200/tech",
    "http://placeimg.com/150/200/tech",
    "http://placeimg.com/150/200/tech",
    "http://placeimg.com/150/200/tech",
    "http://placeimg.com/150/200/tech",
    "http://placeimg.com/150/200/tech",
    "http://placeimg.com/150/200/tech",
  ];
  const [images, setImages] = useState<string[]>([...dummyImgs]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const infScrollImgLength = getInfScrollImgLength(images.length);
  const minHeight = `${39.2 + infScrollImgLength * 20}vh`; // 동적높이적용

  const loadMoreImages = useCallback(async () => {
    try {
      const response = await axios.get("/api/your_endpoint", {
        params: {
          page: page,
          size: 16,
        },
      });

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
  // for infinite scroll 😀

  return (
    <>
      <MyProfileWrapper minHeight={minHeight}>
        <MyInfoWrapper>
          <MyBgImg></MyBgImg>
          <MyInfoSpace></MyInfoSpace>
          <MyInfoContentWrapper>
            <MyProfileImg>
              <EditPenButton></EditPenButton>
            </MyProfileImg>
            <MyProfileTextWrapper>
              <Nickname>{nickname}</Nickname>
              <Desc>{desc}</Desc>
              <EditButton>수정하기</EditButton>
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
                  {starPoint}
                  <br />
                  별조각
                </NumText>
              </FollowingTextWrapper>
              {/* <PayButton /> */}
              <OpenPayModalButton />
            </FollowingAndPayWrappter>
          </MyInfoContentWrapper>
        </MyInfoWrapper>
        <MyProfileContentWrapper minHeight={minHeight}>
          <MyProfileContentTitleWrapper>
            <MyProfileContentTitle>{nickname}님의 Gemini</MyProfileContentTitle>
            <MyProfileContentTitle>
              닉네임님의 TRPG 추억로그
            </MyProfileContentTitle>
          </MyProfileContentTitleWrapper>
          <MyProfileContentBodyWrapper minHeight={minHeight}>
            <MyProfileContentBody
              images={images}
              hasMore={hasMore}
              loadMoreImages={loadMoreImages}
            />
          </MyProfileContentBodyWrapper>
        </MyProfileContentWrapper>
      </MyProfileWrapper>
    </>
  );
};
export default MyProfile;