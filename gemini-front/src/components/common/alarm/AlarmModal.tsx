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
  initialAlarmList: Alarm[];
}

const AlarmModal: React.FC<Props> = ({ onClose, initialAlarmList }) => {
  const [alarmList, setAlarmList] = useState(initialAlarmList);

  const updateAlarmList = (newAlarm: Alarm) => {
    // 알림 id가 이미 리스트에 존재하는 경우에는 업데이트를 하지 않습니다.
    if (alarmList.some((alarm) => alarm.alarmId === newAlarm.alarmId)) {
      return;
    } else {
      setAlarmList((prevAlarmList) => [...prevAlarmList, newAlarm]);
    }
  };
  console.log(alarmList);

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
                alarmList.map((alarm, idx) => (
                  <AlarmContent key={idx} idx={idx}>
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
