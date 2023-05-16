import React from "react";
import {
  LightOverlay,
  StyledBody,
  Opponent,
  Interval,
} from "./AlarmModalStyle";

interface Props {
  onClose: () => void;
}

const GeminiAlarmModal: React.FC<Props> = ({ onClose }) => {
  return (
    <>
      <LightOverlay onClick={onClose} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <StyledBody onClick={onClose}>
            <Opponent>
              제미니 소환이 완료되었습니다!
              <Interval />
              알람창을 열어보세요!{" "}
            </Opponent>
          </StyledBody>
        </div>
      </LightOverlay>
    </>
  );
};

export default GeminiAlarmModal;
