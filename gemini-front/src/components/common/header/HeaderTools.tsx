import React, { FC, useState } from "react";
import { AppStore } from "../../../store/store";
import { useSelector } from "react-redux";
import Message from "../../../assets/img/Message.png";
import Notification from "../../../assets/img/Notification.png";
import Adol1by1Dummy from "../../../assets/img/Adol1by1Dummy.png";
import {
  StyledHeaderTools,
  StyledProfileImage,
  StyledNotification,
  StyledMessage,
} from "./HeaderTools.styles";
import AlarmModal from "../alarm/AlarmModal";
import ProfileModal from "./profileImage/ProfileModal";

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

  const reduxProfileImage = useSelector(
    (state: AppStore) => state.user.profileImgUrl
  );

  const showProfileModalHandler = () => {
    setShowAlarmModal(false);
    setShowProfileModal((prevState) => !prevState);
  };

  const showMessageModalHandler = () => {
    setShowProfileModal(false);
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
        {reduxProfileImage && (
          <StyledProfileImage
            src={reduxProfileImage}
            alt="ProfileImage"
            onClick={showProfileModalHandler}
          />
        )}
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
          <AlarmModal alarmList={alarmList} onClose={closeAlarmModal} />
        )}
        {showProfileModal && <ProfileModal onClose={closeProfileModal} />}

        {/* {showProfileModal && <AlarmModal onClose={closeProfileModal} />} */}
      </StyledHeaderTools>
    </>
  );
};

export default HeaderTools;
