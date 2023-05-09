import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import Message from "../../../assets/img/Message.png";
import Notification from "../../../assets/img/Notification.png";
import {
  StyledHeaderTools,
  StyledProfileImage,
  StyledNotification,
  StyledMessage,
} from "./HeaderTools.styles";
import AlarmModal from "../alarm/AlarmModal";

type Alarm = {
  alarmId: number;
  memo: string;
  checked: boolean;
  category: number;
};

interface Props {
  alarmList: Alarm[];
}

const HeaderTools: FC<Props> = ({ alarmList }) => {
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const showProfileModalHandler = () => {
    setShowProfileModal((prevState) => !prevState);
  };

  const showMessageModalHandler = () => {
    setShowAlarmModal((prevState) => !prevState);
  };

  const showNotificationModalHandler = () => {
    setShowNotificationModal((prevState) => !prevState);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  const closeAlarmModal = () => {
    setShowAlarmModal(false);
  };

  return (
    <>
      <StyledHeaderTools>
        <StyledProfileImage
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
        {showAlarmModal && (
          <AlarmModal initialAlarmList={alarmList} onClose={closeAlarmModal} />
        )}

        {/* {showProfileModal && <AlarmModal onClose={closeProfileModal} />} */}
      </StyledHeaderTools>
    </>
  );
};

export default HeaderTools;
