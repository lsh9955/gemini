import React, { FC, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Message from "../../../assets/img/Message.png";
import Notification from "../../../assets/img/Notification.png";
import {
  StyledHeaderTools,
  StyledProfileImage,
  StyledMessage,
  StyledNotification,
} from "./HeaderTools.styles";
import AlarmModal from "../alarm/AlarmModal";

type Alarm = {
  memo: string;
  checked: boolean;
  category: number;
};

interface AlarmProps {
  alarmList: Alarm[];
}

const HeaderTools: FC<AlarmProps> = ({ alarmList }) => {
  const [showModal, setShowModal] = useState(false);

  const profileImgHandler = () => {
    // history.push("/");
  };

  const messageHandler = () => {
    // history.push("/");
    setShowModal((prevState) => !prevState);
  };

  const notificationImgHandler = () => {
    // history.push("/");
  };

  const closeModal = () => {
    setShowModal(false);
  };
  console.log(alarmList);

  return (
    <>
      <StyledHeaderTools>
        <StyledProfileImage
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
        {showModal && <AlarmModal alarmList={alarmList} onClose={closeModal} />}
      </StyledHeaderTools>
    </>
  );
};

export default HeaderTools;
