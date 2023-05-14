import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
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

  const handleAlarmClick = async (alarmId: number, category: number) => {
    // 카테고리에 따라 페이지 이동이나 모달 표시를 다르게 처리합니다.
    switch (category) {
      case 1:
        // 팔로우 했을 때
        history.push("/mypage");
        break;

      case 2:
        // 좋아요 눌렸을 때
        break;
      case 3:
        // 제미니 생성
        const geminino = alarmList[-1].find(
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
        // 알람 삭제 요청 보내기
        try {
          await axios.delete(`http://172.30.1.22:8081/alarms/${alarmId}`);

          // 삭제 성공 후 알람 리스트 업데이트 등 필요한 작업 수행
          // 예를 들어, 알람 리스트에서 해당 알람을 제거하는 작업을 수행할 수 있습니다.
        } catch (error) {
          console.error("알람 삭제 실패:", error);
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
                  alarmList[-1].map((alarm: any, idx: any) => (
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
