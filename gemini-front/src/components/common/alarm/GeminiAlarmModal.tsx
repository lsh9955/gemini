import React from "react";
import { LightOverlay, GeminiAlarm, AlarmTitle } from "./AlarmModalStyle";

interface Props {
  onClose: () => void;
}

const GeminiAlarmModal: React.FC<Props> = ({ onClose }) => {
  return (
    <>
      <LightOverlay onClick={onClose} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <GeminiAlarm>
            <AlarmTitle onClick={onClose}>
              제미니 소환이 완료되었습니다! <br />
              알람창을 열어보세요!
            </AlarmTitle>
          </GeminiAlarm>
        </div>
      </LightOverlay>
    </>
  );
};

export default GeminiAlarmModal;
