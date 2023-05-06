import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import {
  StarImgWrapper,
  StyledPayButton,
  StyledPayButtonText,
} from "./PayButton.styles";

declare const window: typeof globalThis & {
  IMP: any;
};

const PayModal = () => {
  const [payInput, setPayInput] = useState<number>(0);
  // 숫자 입력 input
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target.value;
    const inputValue = parseInt(currentInput);
    setPayInput(inputValue);
  };

  // 아임포트 결제 모듈
  const onClickPayment = () => {
    const IMP = window.IMP;
    IMP.init(process.env.REACT_APP_KAKAOPAY_IMP);
    const data = {
      pg: "kakaopay",
      pay_method: "card",
      merchant_uid: "57008833-33004",
      name: "별 구매하기",
      amount: 1000,
    };
    IMP.request_pay(data, callback);
  };

  // 결제 모듈 성공시 별 개수 변경, merchant_uid 등 결제 정보 보내서 저장하기
  const callback = (res: any) => {
    if (res.success) {
      alert("별 구매가 완료되었습니다.");
      // axios.patch("").then().catch();
    } else {
      alert("다시 한 번 시도하여 주십시오.");
      console.log(res);
    }
  };

  return (
    <>
      <StyledPayButton onClick={onClickPayment}>
        <StyledPayButtonText>별조각 구매하기 </StyledPayButtonText>
        <StarImgWrapper />
      </StyledPayButton>
    </>
  );
};

export default PayModal;
