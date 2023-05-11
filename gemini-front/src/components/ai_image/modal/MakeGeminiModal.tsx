import React, { useState } from "react";
import { useSelector } from "react-redux";
import CompleteAiImage from "../../../assets/img/CompleteAiImage.png";

// styled-components
import {
  ModalContainer,
  Overlay,
  ModalForm,
  ModalBackground,
  ConfirmButton,
  CancelButton,
  Interval,
  ModalTitle,
  First,
} from "./ModalStyle";
import SuccessGeminiModal from "../modal/SuccessGeminiModal";

export interface Props {
  onClose: () => void;
}

type UserState = {
  user: {
    star: number;
  };
};

const MakeGeminiModal: React.FC<Props> = ({ onClose }) => {
  const [currentModal, setCurrentModal] = useState<React.ReactNode>("");

  // 여기서 axios가 성공했을 때 successgeminimodal로 보내기
  const MakeGeminiHandler = () => {
    setCurrentModal(<SuccessGeminiModal onClose={onClose} />);
  };

  return (
    <>
      {!currentModal && (
        <Overlay onClick={onClose} aria-hidden>
          <div aria-hidden onClick={(e) => e.stopPropagation()}>
            <ModalContainer>
              <ModalForm>
                <ModalTitle>
                  <First>생성 시 별 1개가 차감됩니다</First>
                  <div>결제하시겠어요?</div>
                </ModalTitle>
                <Interval>
                  <ConfirmButton onClick={MakeGeminiHandler}>
                    확인
                  </ConfirmButton>
                  <CancelButton onClick={onClose}>취소</CancelButton>
                </Interval>
              </ModalForm>
              <ModalBackground src={CompleteAiImage} alt="modal-background" />
            </ModalContainer>
          </div>
        </Overlay>
      )}
      {currentModal}
    </>
  );
};

export default MakeGeminiModal;
