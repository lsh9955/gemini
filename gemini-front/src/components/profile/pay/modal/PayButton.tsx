import React, { ChangeEvent, useState } from "react";
import axios from "axios";
// 여기부터 수정 😀
import {
  StarImgWrapper,
  StyledPayButton,
  StyledPayButtonText,
} from "./PayButton.styles";

// 분기점 😀

import PayModalBackground from "../../../../assets/img/PayModalBackground.png";
import KakaoLogo from "../../../../assets/img/kakao_logo.png";

import uuid from "react-uuid";

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
} from "./PayModalstyle";

interface Props {
  onClose: () => void;
}
// 여기까지 수정. 😀

declare const window: typeof globalThis & {
  IMP: any;
};

const PayModal: React.FC<Props> = ({ onClose }) => {
  const [numberValue, setNumberValue] = useState("");

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
      axios
        .post(
          "http://192.168.31.221:8081/order/kakao/single-payment",
          {
            orderStar: intNumberValue,
            merchantUid: uid,
          },
          {
            headers: {
              "X-Username": "yyj",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          onClose(); // axios 요청이 끝난 후에 모달이 닫히도록 함
        });
    }
  };

  return (
    <>
<<<<<<< HEAD:gemini-front/src/components/profile/pay/modal/PayButton.tsx
      <StyledPayButton onClick={onClickPayment}>
        <StyledPayButtonText>별조각 구매하기 </StyledPayButtonText>
        <StarImgWrapper />
      </StyledPayButton>
=======
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
            <ModalBackground src={PayModalBackground} alt="modal-background" />
          </ModalContainer>
        </div>
      </Overlay>
>>>>>>> origin/front-dev_pay:gemini-front/src/components/profile/pay/modal/PayModal.tsx
    </>
  );
};

export default PayModal;
