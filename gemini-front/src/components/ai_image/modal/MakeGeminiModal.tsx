import React, { useState } from "react";
import CompleteAiImage from "../../../assets/img/CompleteAiImage.png";
import axios from "axios";
import axiosInstanceWithAccessToken from "../../../utils/AxiosInstanceWithAccessToken";

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

interface TagIds {
  genreTagId: number;
  presetTagId: number;
  genderTagId: number;
  hairColorTagId: number;
  eyeColorTagId: number;
  hairStyleTagId: number;
  emotionTagId: number;
  costumeTagId: number;
}

export interface Props {
  tagIds: TagIds;
  onClose: () => void;
}

const MakeGeminiModal: React.FC<Props> = ({ onClose, tagIds }) => {
  const [currentModal, setCurrentModal] = useState<React.ReactNode>("");

  const headers = {
    "X-Username": "google_109918724409380589068",
  };
  const data = {
    tagIds: [
      tagIds.genreTagId,
      tagIds.presetTagId,
      tagIds.genderTagId,
      tagIds.hairColorTagId,
      tagIds.eyeColorTagId,
      tagIds.hairStyleTagId,
      tagIds.emotionTagId,
      tagIds.costumeTagId,
    ],
  };

  // 여기서 axios가 성공했을 때 successgeminimodal로 보내기
  const MakeGeminiHandler = () => {
    // 제미니 생성 post axios 하고 백서버에선 별개수를 반환해준다.
    // axios 성공시에 아래 성공 모달을 집어 넣는다. 그리고 반환된 별개수를 리덕스에 저장한다.
    // onClose();
    setCurrentModal(<SuccessGeminiModal tagIds={tagIds} onClose={onClose} />);
    axiosInstanceWithAccessToken
      .post("/user-service/generate/gemini", data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        alert(`제미니의 제작의뢰가 들어갔다`);
      })
      .catch((error) => {
        console.log(error);
      });
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
