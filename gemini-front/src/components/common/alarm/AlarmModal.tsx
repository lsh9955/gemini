import React from "react";

// styled-components
import {
  Overlay,
  ModalContainer,
  AlarmTitle,
  AlarmContent,
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
      <ModalContainer>
        <AlarmTitle>알림</AlarmTitle>
        {alarmMesseges.map((alarm, idx) => (
          <AlarmContent key={alarm.id} idx={idx}>
            {alarm.content}
          </AlarmContent>
        ))}
      </ModalContainer>
    </>
  );
};

export default AlarmModal;
