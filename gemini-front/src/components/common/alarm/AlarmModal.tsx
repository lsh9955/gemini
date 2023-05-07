import React from "react";

// styled-components
import {
  Overlay,
  ModalContainer,
  AlarmTitle,
  AlarmContent,
  NoAlarmContent,
} from "./AlarmModalStyle";

interface Props {
  onClose: () => void;
}

const AlarmModal: React.FC<Props> = ({ onClose }) => {
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
  ];

  return (
    <>
      <Overlay onClick={onClose} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <ModalContainer>
            <AlarmTitle>알림</AlarmTitle>
            {alarmMesseges.length === 0 ? (
              <NoAlarmContent>받은 알람이 없습니다.</NoAlarmContent>
            ) : (
              alarmMesseges.map((alarm, idx) => (
                <AlarmContent key={alarm.id} idx={idx}>
                  {alarm.content}
                </AlarmContent>
              ))
            )}
          </ModalContainer>
        </div>
      </Overlay>
    </>
  );
};

export default AlarmModal;
