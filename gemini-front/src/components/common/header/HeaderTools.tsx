import React, { FC, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// import GeminiLogo from "../../assets/img/GeminiLogo.png";
import Message from "../../../assets/img/Message.png";
import Notification from "../../../assets/img/Notification.png";
import {
  StyledHeaderTools,
  StyledProfileImage,
  StyledMessage,
  StyledNotification,
} from "./HeaderTools.styles";
import AlarmModal from "../alarm/AlarmModal";

const HeaderTools: FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const profileImgHandler = () => {
    // history.push("/");
  };

  const messageHandler = () => {
    // history.push("/");
  };

  const notificationImgHandler = () => {
    // history.push("/");
    setIsNotificationOpen(!isNotificationOpen);
    setShowModal(true);
  };

  return (
    <>
      <StyledHeaderTools>
        <StyledProfileImage // 이 부분을 추가합니다.
          //   src={ProfileImage}
          alt="ProfileImage"
          onClick={profileImgHandler}
        ></StyledProfileImage>
        <StyledMessage
          src={Message}
          alt="MessageImg"
          onClick={messageHandler}
        ></StyledMessage>
        <StyledNotification
          src={Notification}
          alt="NotificationImg"
          onClick={notificationImgHandler}
        ></StyledNotification>
        {showModal && (
          <AlarmModal isOpen={isNotificationOpen} onClose={closeModal} />
        )}
      </StyledHeaderTools>
    </>
  );
};

export default HeaderTools;
