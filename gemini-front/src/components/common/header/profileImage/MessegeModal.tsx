import React from "react";

// styled-components
import { Overlay } from "../../alarm/AlarmModalStyle";
import {
  ModalContent,
  SecondContent,
  MessegeModalContainer,
} from "../profileImage/ProfileModalStyle";

interface Props {
  onClose: () => void;
}

const MessegeModal: React.FC<Props> = ({ onClose }) => {
  return (
    <>
      <Overlay onClick={onClose} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <MessegeModalContainer>
            <ModalContent>
              <SecondContent>준비중</SecondContent>
            </ModalContent>
          </MessegeModalContainer>
        </div>
      </Overlay>
    </>
  );
};

export default MessegeModal;
