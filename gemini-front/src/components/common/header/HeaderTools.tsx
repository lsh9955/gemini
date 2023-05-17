import React, { FC, useState, useEffect } from "react";
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
// import ProfileModal from "./profileImage/ProfileModal";
// import MessegeModal from "./profileImage/MessegeModal";
import GeminiAlarmModal from "../alarm/GeminiAlarmModal";

// type Alarm = {
//   alarmId: number;
//   memo: string;
//   checked: boolean;
//   category: number;
// };

// interface Props {
//   alarmList: Alarm[];
// }

const HeaderTools: FC = () => {
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  // const [showProfileModal, setShowProfileModal] = useState(false);
  // const [showMessegeModal, setShowMessegeModal] = useState(false);
  const [showGeminiAlarmModal, setShowGeminiAlarmModal] = useState(false);

  // gemini 알림 보여줬는지 check
  const [geminiAlarmShown, setGeminiAlarmShown] = useState(false);

  // useEffect(() => {
  //   // alarmList가 변할 때마다 실행
  //   alarmList.forEach((alarm: Alarm) => {
  //     if (alarm.category === 3 && !geminiAlarmShown) {
  //       setShowGeminiAlarmModal(true); // 카테고리가 3인 알람이 있으면 모달을 보여줌
  //       setGeminiAlarmShown(true); // 모달을 보여줬음을 표시
  //     }
  //   });
  // }, [alarmList]);

  const reduxProfileImage = useSelector(
    (state: AppStore) => state.user.profileImgUrl
  );

  // const showProfileModalHandler = () => {
  //   setShowAlarmModal(false);
  //   setShowMessegeModal(false);
  //   setShowGeminiAlarmModal(false);
  //   setShowProfileModal((prevState) => !prevState);
  // };

  const showAlarmModalHandler = () => {
    // setShowProfileModal(false);
    // setShowMessegeModal(false);
    setShowGeminiAlarmModal(false);
    setShowAlarmModal((prevState) => !prevState);
  };

  // const showMessegeModalHandler = () => {
  //   setShowAlarmModal(false);
  //   setShowProfileModal(false);
  //   setShowGeminiAlarmModal(false);
  //   setShowMessegeModal((prevState) => !prevState);
  // };

  // const closeProfileModal = () => {
  //   setShowProfileModal(false);
  // };

  const closeAlarmModal = () => {
    setShowAlarmModal(false);
  };

  // const closeMessegeModal = () => {
  //   setShowMessegeModal(false);
  // };

  const closeGeminiModal = () => {
    setShowGeminiAlarmModal(false);
  };

  return (
    <>
      <StyledHeaderTools>
        {reduxProfileImage ? (
          <StyledProfileImage
            src={reduxProfileImage}
            alt="ProfileImage"
            // onClick={showProfileModalHandler}
          />
        ) : (
          <StyledProfileImage
            src={Adol1by1Dummy}
            alt="ProfileImage"
            // onClick={showProfileModalHandler}
          />
        )}
        <StyledMessage
          src={Message}
          alt="MessageImg"
          onClick={showAlarmModalHandler}
        ></StyledMessage>
        <StyledNotification
          src={Notification}
          alt="NotificationImg"
          // onClick={showMessegeModalHandler}
        ></StyledNotification>
        {showAlarmModal && <AlarmModal onClose={closeAlarmModal} />}
        {/* {showProfileModal && <ProfileModal onClose={closeProfileModal} />}
        {showMessegeModal && <MessegeModal onClose={closeMessegeModal} />} */}
        {showGeminiAlarmModal && (
          <GeminiAlarmModal onClose={closeGeminiModal} />
        )}
      </StyledHeaderTools>
    </>
  );
};

export default HeaderTools;
