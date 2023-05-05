import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import OpenPayModalButton from "../../components/profile/pay/button/OpenPayModalButton";
import PayModal from "../../components/profile/pay/modal/PayModal";
import {
  MyBgImg,
  MyInfoContentWrapper,
  MyInfoSpace,
  MyInfoWrapper,
  MyProfileImg,
  MyProfileWrapper,
} from "./UserProfile.styles";
// import { MyProfileWrapper } from "../../components/profile/myprofile/MyProfileComp.styles";

const MyProfile: FC = () => {
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
            <MyProfileImg>프로필</MyProfileImg>
          </MyInfoContentWrapper>
        </MyInfoWrapper>
        <PayModal />
      </MyProfileWrapper>
    </>
  );
};
export default MyProfile;
