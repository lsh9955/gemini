import React, { ChangeEvent, useState } from "react";
import axiosInstanceWithAccessToken from "../../../../utils/AxiosInstanceWithAccessToken";
import { useDispatch } from "react-redux";
import { updateStar } from "../../../../store/UserSlice";

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
  setPaymentResult: any;
}
// 여기까지 수정. 😀

declare const window: typeof globalThis & {
  IMP: any;
};

const PayModal: React.FC<Props> = ({ onClose, setPaymentResult }) => {
  const [numberValue, setNumberValue] = useState("");
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
          setPaymentResult(updatedStar); // 결제 결과를 저장
          dispatch(updateStar(updatedStar)); // updateStar 액션 dispatch
          // setCurrentModal(<MakeGeminiModal onClose={onClose} />);
        })
        .catch((error) => {
          console.log(error);
          // setCurrentModal(<MakeGeminiModal onClose={onClose} />);
        })
        .finally(() => {
          onClose(); // axios 요청이 끝난 후에 모달이 닫히도록 함
        });
    }
  };

  return (
    <>
      {/* <StyledPayButton onClick={onClickPayment}>
        <StyledPayButtonText>별조각 구매하기 </StyledPayButtonText>
        <StarImgWrapper />
      </StyledPayButton> */}
      {/* 아래가 새로 들어온거 😀 */}
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
    </>
  );
};

export default PayModal;
