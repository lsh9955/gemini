import React from "react";

// styled-components
import {
  BackgroundContainer,
  BackgroundContent,
  BackgroundOverlay,
  Button,
} from "./AlarmModalStyle";

interface Props {
  closeModal: () => void;
  selectedImageUrl: string | undefined;
  // onClose: () => void;
}

const BackgroundAlarmModal: React.FC<Props> = ({
  closeModal,
  selectedImageUrl,
  // onClose,
}) => {
  const dummyUrl =
    "https://mygemini.s3.amazonaws.com/gemini/20230516_042947103333_background.png";
  return (
    <>
      <BackgroundOverlay onClick={closeModal} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <BackgroundContainer>
            <BackgroundContent>
              <img src={selectedImageUrl} alt="selected-imagerul" />
            </BackgroundContent>
            <Button onClick={closeModal}>확인</Button>
          </BackgroundContainer>
        </div>
      </BackgroundOverlay>
    </>
  );
};
export default BackgroundAlarmModal;
