import React, { ChangeEvent, useState } from "react";
import axios from "axios";

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
    IMP.init("imp47473242");
    const data = {
      pg: "kakaopay",
      pay_method: "card",
      merchant_uid: "57008833-33004",
      name: "별 구매하기",
      amount: payInput * 1000,
      // m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
      // buyer_email: "Iamport@chai.finance",
      // buyer_name: "포트원 기술지원팀",
      // buyer_tel: "010-1234-5678",
      // buyer_addr: "서울특별시 강남구 삼성동",
      // buyer_postcode: "123-456",
    };
    IMP.request_pay(data, callback);
  };

  // 결제 모듈 성공시 별 개수 변경
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
      <button onClick={onClickPayment}>구매하기</button>
    </>
  );
};

export default PayModal;
