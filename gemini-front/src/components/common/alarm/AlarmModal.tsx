import React, { useState } from "react";
import {
  Overlay,
  ModalContainer,
  AlarmTitle,
  AlarmContent,
  NoAlarmContent,
  AlarmContentWrapper,
} from "./AlarmModalStyle";

type Alarm = {
  alarmId: number;
  memo: string;
  checked: boolean;
  category: number;
};

interface Props {
  onClose: () => void;
  alarmList: Alarm[];
}

const AlarmModal: React.FC<Props> = ({ onClose, alarmList }) => {
  // const alarmList;

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
  const alarmMesseges = [
    {
      id: 1,
      content: "Alarm1",
    },
    {
      id: 2,
      content: "Alarm2",
    },
    {
      id: 3,
      content: "Alarm3",
    },
    {
      id: 4,
      content: "Alarm4",
    },
    {
      id: 5,
      content: "Alarm5",
    },
    {
      id: 6,
      content: "Alarm6",
    },
  ];

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
              {alarmMesseges.length === 0 ? (
                <NoAlarmContent>받은 알람이 없습니다.</NoAlarmContent>
              ) : (
                alarmMesseges.map((alarm, idx) => (
                  <AlarmContent key={alarm.id} idx={alarm.id}>
                    {alarm.content}
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
