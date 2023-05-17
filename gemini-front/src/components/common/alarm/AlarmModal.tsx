import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import NewGeminiDetail from "../../geminiDetail/NewGeminiDetail";
import {
  Overlay,
  ModalContainer,
  AlarmTitle,
  AlarmContent,
  NoAlarmContent,
  AlarmContentWrapper,
} from "./AlarmModalStyle";
import UserGeminiDetail from "../../geminiDetail/UserGeminiDetail";
import axiosInstanceWithAccessToken from "../../../utils/AxiosInstanceWithAccessToken";
import BackgroundAlarmModal from "./BackgroundAlarmModal";

type Alarm = {
  alarmId: number;
  memo: string;
  checked: boolean;
  category: number;
};

interface Props {
  onClose: () => void;
  // alarmList: any;
}

const AlarmModal: React.FC<Props> = ({ onClose }) => {
  const history = useHistory();
  const [currentModal, setCurrentModal] = useState<React.ReactNode>("");
  const [showGeminiDetail, setShowGeminiDetail] = useState(false);
  const [selectedGemini, setSelectedGemini] = useState<any>(null);
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);

  useEffect(() => {
    axiosInstanceWithAccessToken
      .get(`/user-service/alarms`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // const handleAlarmClick = async (alarmId: number, category: number) => {
  //   // 카테고리에 따라 페이지 이동이나 모달 표시를 다르게 처리합니다.
  //     const selectAlarmList = alarmList.find(
  //       (alarm: any) => alarm.alarmId === alarmId && alarm.category === category
  //     );
  //     switch (category) {
  //       case 1:
  //         // 팔로우 했을 때
  //         history.push(`/userProfile/${selectAlarmList.follower}`);
  //         // 알람 삭제 요청 보내기
  //         try {
  //           await axiosInstanceWithAccessToken.delete(
  //             `/user-service/alarms/${selectAlarmList.alarmId}`
  //           );
  //           // await axios.delete(`/alarms/${alarmId}`, {
  //           //   headers: {
  //           //     "X-username": "yyj", // 토큰을 사용하는 경우 예시입니다
  //           //   },
  //           // });
  //         } catch (error) {
  //           console.error("알람 삭제 실패:", error);
  //         }
  //         break;
  //       case 2:
  //         // 좋아요 눌렸을 때
  //         if (selectAlarmList) {
  //           const GeminiDetailModal = (
  //             <UserGeminiDetail
  //               closeModal={() => setCurrentModal("")}
  //               selectedImagePk={selectAlarmList.geminiNo}
  //             />
  //           );
  //           setCurrentModal(GeminiDetailModal);
  //         }
  //         // 알람 삭제 요청 보내기
  //         try {
  //           await axiosInstanceWithAccessToken.delete(
  //             `/user-service/alarms/${selectAlarmList.alarmId}`
  //           );
  //         } catch (error) {
  //           console.error("알람 삭제 실패:", error);
  //         }
  //         break;
  //       case 3:
  //         // 제미니 생성
  //         if (selectAlarmList) {
  //           const NewGeminiDetailModal = (
  //             <NewGeminiDetail
  //               closeModal={() => {
  //                 setCurrentModal(null);
  //                 onClose();
  //               }}
  //               selectedImagePk={selectAlarmList.geminiNo}
  //             />
  //           );
  //           setCurrentModal(NewGeminiDetailModal);
  //         }
  //         // 알람 삭제 요청 보내기
  //         try {
  //           await axiosInstanceWithAccessToken.delete(
  //             `/user-service/alarms/${selectAlarmList.alarmId}`
  //           );
  //         } catch (error) {
  //           console.error("알람 삭제 실패:", error);
  //         }
  //         break;
  //       case 4:
  //         // 배경 생성
  //         if (selectAlarmList) {
  //           const NewBackgroundDetailModal = (
  //             <BackgroundAlarmModal
  //               closeModal={() => {
  //                 setCurrentModal(null);
  //                 onClose();
  //               }}
  //               selectedImageUrl={selectAlarmList.imageUrl}
  //             />
  //           );
  //           setCurrentModal(NewBackgroundDetailModal);
  //         }
  //         // 알람 삭제 요청 보내기
  //         try {
  //           await axiosInstanceWithAccessToken.delete(
  //             `/user-service/alarms/${selectAlarmList.alarmId}`
  //           );
  //         } catch (error) {
  //           console.error("알람 삭제 실패:", error);
  //         }
  //         break;
  //     }
  // };

  return (
    <>
      {!currentModal && (
        <Overlay onClick={onClose} aria-hidden>
          <div aria-hidden onClick={(e) => e.stopPropagation()}>
            <ModalContainer>
              <AlarmTitle>알림</AlarmTitle>
              {/* <AlarmContentWrapper
                style={{
                  maxHeight: "25vh",
                  overflowY: alarmList.length >= 6 ? "auto" : "visible",
                }}
              >
                {alarmList.length === 0 ? (
                  <NoAlarmContent>받은 알람이 없습니다.</NoAlarmContent>
                ) : (
                  alarmList.map((alarm: any, idx: any) => (
                    <AlarmContent
                      key={alarm.alarmId}
                      idx={idx}
                      onClick={() =>
                        handleAlarmClick(alarm.alarmId, alarm.category)
                      }
                    >
                      {alarm.memo}
                    </AlarmContent>
                  ))
                )}
              </AlarmContentWrapper> */}
            </ModalContainer>
          </div>
        </Overlay>
      )}
      {currentModal}
    </>
  );
};

export default AlarmModal;
