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
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const showProfileModalHandler = () => {
    // history.push("/");
    setShowProfileModal((prevState) => !prevState);
  };

  const showMessageModalHandler = () => {
    // history.push("/");
    setShowAlarmModal((prevState) => !prevState);
  };

  const showNotificationModalHandler = () => {
    setShowNotificationModal((prevState) => !prevState);
    // history.push("/");
  };

  const closeProfileModal = () => {
    setShowAlarmModal(false);
  };

  const closeAlarmModal = () => {
    setShowAlarmModal(false);
  };

  return (
    <>
      <StyledHeaderTools>
        <StyledProfileImage // 이 부분을 추가합니다.
          //   src={ProfileImage}
          alt="ProfileImage"
          onClick={showProfileModalHandler}
        ></StyledProfileImage>
        <StyledMessage
          src={Message}
          alt="MessageImg"
          onClick={showMessageModalHandler}
        ></StyledMessage>
        <StyledNotification
          src={Notification}
          alt="NotificationImg"
          onClick={showNotificationModalHandler}
        ></StyledNotification>
        {showAlarmModal && <AlarmModal onClose={closeAlarmModal} />}
        {showProfileModal && <AlarmModal onClose={closeProfileModal} />}
      </StyledHeaderTools>
    </>
  );
};

export default HeaderTools;
