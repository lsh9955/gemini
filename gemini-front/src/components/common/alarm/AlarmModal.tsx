import React, { useState } from "react";
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
  // const updateAlarmList = (newAlarm: Alarm) => {
  //   // 알림 id가 이미 리스트에 존재하는 경우에는 업데이트를 하지 않습니다.
  //   if (initialAlarmList.find((alarm) => alarm.alarmId === newAlarm.alarmId)) {
  //     return;
  //   } else {
  //     setAlarmList((prevAlarmList) => [...prevAlarmList, newAlarm]);
  //   }
  // };
  // console.log(alarmList);
  // console.log(alarmList);
  // const alarmMesseges = [
  //   {
  //     id: 1,
  //     content: "Alarm1",
  //   },
  //   {
  //     id: 2,
  //     content: "Alarm2",
  //   },
  //   {
  //     id: 3,
  //     content: "Alarm3",
  //   },
  //   {
  //     id: 4,
  //     content: "Alarm4",
  //   },
  //   {
  //     id: 5,
  //     content: "Alarm5",
  //   },
  //   {
  //     id: 6,
  //     content: "Alarm6",
  //   },
  // ];
  const handleAlarmClick = (category: number) => {
    // 카테고리에 따라 페이지 이동이나 모달 표시를 다르게 처리합니다.
    switch (category) {
      case 1:
        // 첫 번째 카테고리에 대한 처리
        break;
      case 2:
        // 두 번째 카테고리에 대한 처리
        break;
      case 3:
        // 세번째 카테고리에 대한 처리
        break;
    }
  };

  return (
    <>
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
                    onClick={() => handleAlarmClick(alarm.category)}
                  >
                    {alarm.memo}
                  </AlarmContent>
                ))
              )}
            </AlarmContentWrapper>
          </ModalContainer>
        </div>
      </Overlay>
    </>
  );
};

export default AlarmModal;
