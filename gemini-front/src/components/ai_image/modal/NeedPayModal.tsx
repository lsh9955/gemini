import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { updateStar } from "../../../store/UserSlice";

import uuid from "react-uuid";
import KakaoLogo from "../../../assets/img/kakao_logo.png";
import CompleteAiImage from "../../../assets/img/CompleteAiImage.png";

//styled-components
import {
  ModalBackground,
  ModalContainer,
  Overlay,
  ModalForm,
  PayButton,
  LogoImage,
  PayTitle,
  Input,
  InputSpan,
  InputContainer,
} from "../../profile/pay/modal/PayModalstyle";
import MakeGeminiModal from "./MakeGeminiModal";
import axiosInstanceWithAccessToken from "../../../utils/AxiosInstanceWithAccessToken";

declare const window: typeof globalThis & {
  IMP: any;
};

interface Props {
  onClose: () => void;
}

const NeedPayModal: React.FC<Props> = ({ onClose }) => {
  const [numberValue, setNumberValue] = useState("");
  // const [currentModal, setCurrentModal] = useState<React.ReactNode>("");
  const dispatch = useDispatch();

  // 숫자 외 입력 불가
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const numberRegex = /^[0-9]*$/;
    if (numberRegex.test(newValue)) {
      setNumberValue(newValue);
    }
  };

  const intNumberValue = parseInt(numberValue, 10);
  const uid = uuid();

  // 아임포트 결제 모듈
  const onClickPayment = () => {
    const IMP = window.IMP;
    IMP.init(process.env.REACT_APP_KAKAOPAY_IMP);
    const data = {
      pg: "kakaopay",
      pay_method: "card",
      // merchant_uid가 결제마다 꼭 달라야 함
      merchant_uid: uid,
      name: "별 구매하기",
      amount: intNumberValue * 1000,
    };
    IMP.request_pay(data, callback);
  };

  // 결제 모듈 성공시 별 개수 변경, merchant_uid 등 결제 정보 보내서 저장하기
  const callback = (res: any) => {
    if (res.success) {
      axiosInstanceWithAccessToken
        .post(`/user-service/order/kakao/single-payment`, {
          orderStar: intNumberValue,
          merchantUid: uid,
        })
        .then((response) => {
          console.log(response);
          const updatedStar = response.data.star;
          dispatch(updateStar(updatedStar)); // updateStar 액션 dispatch
          onClose();
          // setCurrentModal(<MakeGeminiModal onClose={onClose} />);
        })
        .catch((error) => {
          console.log(error);
          onClose();
          // setCurrentModal(<MakeGeminiModal onClose={onClose} />);
        });
    }
  };

  return (
    <>
      {/* {currentModal ? (
        currentModal
      ) : ( */}
      <Overlay onClick={onClose} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <ModalContainer>
            <ModalForm>
              <PayTitle>별조각 1개당 1000원이 결제됩니다.</PayTitle>
              <InputContainer>
                <Input
                  type="text"
                  value={numberValue}
                  onChange={handleInputChange}
                />
                <InputSpan>별조각</InputSpan>
              </InputContainer>
              <PayButton onClick={onClickPayment}>
                <LogoImage src={KakaoLogo} alt="logo"></LogoImage>
                구매하기
              </PayButton>
            </ModalForm>
            <ModalBackground src={CompleteAiImage} alt="modal-background" />
          </ModalContainer>
        </div>
      </Overlay>
      {/* )} */}
    </>
  );
};

export default NeedPayModal;
