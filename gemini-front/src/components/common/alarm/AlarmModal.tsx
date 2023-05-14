import React, { useState } from "react";
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

// type Alarm = {
//   alarmId: number;
//   memo: string;
//   checked: boolean;
//   category: number;
// };

interface Props {
  onClose: () => void;
  alarmList: any;
}

const AlarmModal: React.FC<Props> = ({ onClose, alarmList }) => {
  const history = useHistory();
  const [currentModal, setCurrentModal] = useState<React.ReactNode>("");
  const [showGeminiDetail, setShowGeminiDetail] = useState(false);
  const [selectedGemini, setSelectedGemini] = useState<any>(null);

  const handleAlarmClick = (alarmId: number, category: number) => {
    // 카테고리에 따라 페이지 이동이나 모달 표시를 다르게 처리합니다.
    switch (category) {
      case 1:
        history.push("/mypage");
        break;
      case 2:
        // 두 번째 카테고리에 대한 처리
        break;
      case 3:
        // 세번째 카테고리에 대한 처리
        const geminino = alarmList[0].find(
          (alarm: any) =>
            alarm.alarmId === alarmId && alarm.category === category
        );
        console.log(geminino);
        if (geminino) {
          const geminiDetailModal = (
            <NewGeminiDetail
              closeModal={() => setCurrentModal("")}
              selectedImagePk={geminino}
            />
          );
          setCurrentModal(geminiDetailModal);
        }
    }
  };

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
                  overflowY: alarmList.length >= 6 ? "auto" : "visible",
                }}
              >
                {alarmList.length === 0 ? (
                  <NoAlarmContent>받은 알람이 없습니다.</NoAlarmContent>
                ) : (
                  alarmList[0].map((alarm: any, idx: any) => (
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
