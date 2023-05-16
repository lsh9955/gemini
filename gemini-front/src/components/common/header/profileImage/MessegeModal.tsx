import React, { useState } from "react";

// styled-components
import { Overlay } from "../../alarm/AlarmModalStyle";
import {
  ModalContent,
  SecondContent,
  MessegeModalContainer,
} from "../profileImage/ProfileModalStyle";
// import BackgroundAlarmModal from "../../alarm/BackgroundAlarmModal";

interface Props {
  onClose: () => void;
}

const MessegeModal: React.FC<Props> = ({ onClose }) => {
  // const [expModal, setExpModal] = useState(false);
  // const showModal = () => {
  //   setExpModal(true);
  // };
  return (
    <>
      <Overlay onClick={onClose} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <MessegeModalContainer>
            <ModalContent onClick={onClose}>
              <SecondContent>준비중</SecondContent>
            </ModalContent>
          </MessegeModalContainer>
          {/* {expModal && <BackgroundAlarmModal onClose={onClose} />} */}
        </div>
      </Overlay>
    </>
  );
};

export default MessegeModal;
