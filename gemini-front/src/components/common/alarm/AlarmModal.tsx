import React from "react";

// styled-components
import {
  Overlay,
  ModalContainer,
  AlarmTitle,
  AlarmContent,
  NoAlarmContent,
  AlarmContentWrapper,
} from "./AlarmModalStyle";

type Alarm = {
  memo: string;
  checked: boolean;
  category: number;
};

interface Props {
  onClose: () => void;
  alarmList: Alarm[];
}

const AlarmModal: React.FC<Props> = ({ onClose, alarmList }) => {
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
