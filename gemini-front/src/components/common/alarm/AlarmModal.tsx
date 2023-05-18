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
  category: number;
  follower: String;
  geminiNo: number;
  imageUrl: string;
  galleryNo: number;
};

interface Props {
  onClose: () => void;
  // alarmList: any;
}

const AlarmModal: React.FC<Props> = ({ onClose }) => {
  const history = useHistory();
  const [currentModal, setCurrentModal] = useState<React.ReactNode>("");
  // const [showGeminiDetail, setShowGeminiDetail] = useState(false);
  // const [selectedGemini, setSelectedGemini] = useState<any>(null);
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const [alarmStatus, setAlarmStatus] = useState<any>();

  useEffect(() => {
    axiosInstanceWithAccessToken
      .get(`/user-service/alarms`)
      .then((res) => {
        console.log(res);
        setAlarmStatus(res.status);
        setAlarmList(res.data.alarmDtos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAlarmClick = async (alarmId: number, category: number) => {
    // 카테고리에 따라 페이지 이동이나 모달 표시를 다르게 처리합니다.
    const selectAlarmList = alarmList.find(
      (alarm: any) => alarm.alarmId === alarmId && alarm.category === category
    );

    if (selectAlarmList) {
      console.log(selectAlarmList.geminiNo);
      console.log(selectAlarmList.category);
      switch (selectAlarmList.category) {
        case 1:
          window.scrollTo(0, 0); // 무한스크롤 버그 잡기 위해서 해두었습니다. 😥
          history.push(`/userProfile/${selectAlarmList.follower}`);
          try {
            await axiosInstanceWithAccessToken.delete(
              `/user-service/alarms/${selectAlarmList.alarmId}`
            );
          } catch (error) {
            console.error("알람 삭제 실패:", error);
          }
          break;
        case 2:
          const GeminiDetailModal = (
            <UserGeminiDetail
              closeModal={() => setCurrentModal("")}
              selectedImagePk={selectAlarmList.galleryNo}
            />
          );
          setCurrentModal(GeminiDetailModal);
          try {
            await axiosInstanceWithAccessToken.delete(
              `/user-service/alarms/${selectAlarmList.alarmId}`
            );
          } catch (error) {
            console.error("알람 삭제 실패:", error);
          }
          break;
        case 3:
          console.log("case 3으로 들어오나?");
          console.log(selectAlarmList.geminiNo);
          console.log(selectAlarmList.category);
          const NewGeminiDetailModal = (
            <NewGeminiDetail
              closeModal={() => {
                setCurrentModal(null);
                onClose();
              }}
              selectedImagePk={selectAlarmList.geminiNo}
            />
          );
          setCurrentModal(NewGeminiDetailModal);
          try {
            await axiosInstanceWithAccessToken.delete(
              `/user-service/alarms/${selectAlarmList.alarmId}`
            );
          } catch (error) {
            console.error("알람 삭제 실패:", error);
          }
          break;
        case 4:
          const NewBackgroundDetailModal = (
            <BackgroundAlarmModal
              closeModal={() => {
                setCurrentModal(null);
                onClose();
              }}
              selectedImageUrl={selectAlarmList.imageUrl}
            />
          );
          setCurrentModal(NewBackgroundDetailModal);
          try {
            await axiosInstanceWithAccessToken.delete(
              `/user-service/alarms/${selectAlarmList.alarmId}`
            );
          } catch (error) {
            console.error("알람 삭제 실패:", error);
          }
          break;
      }
    }
  };
  console.log(alarmStatus);

  return (
    <>
      {!currentModal && (
        <Overlay onClick={onClose} aria-hidden>
          <div aria-hidden onClick={(e) => e.stopPropagation()}>
            <ModalContainer>
              <AlarmTitle>알림</AlarmTitle>
              <AlarmContentWrapper
                style={{
                  maxHeight: "25vh",
                  // overflowY: alarmList.length >= 6 ? "auto" : "visible",
                }}
              >
                {alarmStatus === 204 ? (
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
              </AlarmContentWrapper>
            </ModalContainer>
          </div>
        </Overlay>
      )}
      {currentModal}
    </>
  );
};

export default AlarmModal;
