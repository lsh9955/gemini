import React from "react";

// styled-components
import { BackgroundContainer, BackgroundOverlay } from "./AlarmModalStyle";

interface Props {
  closeModal: () => void;
  selectedImageUrl: String | null;
}

const BackgroundAlarmModal: React.FC<Props> = ({
  closeModal,
  selectedImageUrl,
}) => {
  return (
    <>
      <BackgroundOverlay onClick={closeModal} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <BackgroundContainer>
            <div>확인</div>
          </BackgroundContainer>
        </div>
      </BackgroundOverlay>
    </>
  );
};
export default BackgroundAlarmModal;
