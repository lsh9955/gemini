import React, { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Desc,
  EditButton,
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
import PayButton from "../../components/profile/pay/modal/PayButton";
import FollowButton from "../../components/profile/userprofile/FollowButton";

type UserProfileParams = {
  nickname: string;
};

const UserProfile: FC = () => {
  const { nickname } = useParams<UserProfileParams>();
  const history = useHistory();

  const moveDonation = () => {
    history.push("/Mypage/Donation");
  };

  const moveMyInfo = () => {
    history.push("/Mypage/MyInfoManage");
  };

  const moveReview = () => {
    history.push("/Mypage/MyReview");
  };

  return (
    <>
      <MyProfileWrapper>
        <MyInfoWrapper>
          <MyBgImg></MyBgImg>
          <MyInfoSpace></MyInfoSpace>
          <MyInfoContentWrapper>
            <MyProfileImg></MyProfileImg>
            <MyProfileTextWrapper>
              <Nickname>다른사람닉네임</Nickname>
              <Desc>
                자기소개 부분: 내가 좋아하는 세계관, 캐릭터 등등을 적어보자 자
                최대 몇글자로 하는게 좋을까? 넘기면 ...으로 만들까
              </Desc>
              {/* <EditButton>수정하기</EditButton> */}
            </MyProfileTextWrapper>
            <FollowingAndPayWrappter>
              <FollowingTextWrapper>
                <NumText>
                  150
                  <br />
                  팔로워
                </NumText>
                <NumText>
                  20
                  <br />
                  팔로잉
                </NumText>
                <NumText>
                  30
                  <br />
                  별조각
                </NumText>
              </FollowingTextWrapper>
              <FollowButton />
            </FollowingAndPayWrappter>
          </MyInfoContentWrapper>
        </MyInfoWrapper>
        <MyProfileContentWrapper>
          <MyProfileContentTitleWrapper>
            <MyProfileContentTitle>닉네임님의 Gemini</MyProfileContentTitle>
            <MyProfileContentTitle>
              닉네임님의 TRPG 추억로그
            </MyProfileContentTitle>
          </MyProfileContentTitleWrapper>
          <MyProfileContentBodyWrapper></MyProfileContentBodyWrapper>
        </MyProfileContentWrapper>
      </MyProfileWrapper>
    </>
  );
};

export default UserProfile;
