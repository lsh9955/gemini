import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import PayModalBackground from "../../../../assets/img/PayModalBackground.png";

//styled-components
import {
  ModalBackground,
  ModalContainer,
  Overlay,
  ModalForm,
} from "./PayModalstyle";

declare const window: typeof globalThis & {
  IMP: any;
};

interface Props {
  onClose: () => void;
}

const PayModal: React.FC<Props> = ({ onClose }) => {
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
      // merchant_uid가 결제마다 꼭 달라야 함
      merchant_uid: "570088sfa33004",
      name: "별 구매하기",
      amount: 1000,
    };
    IMP.request_pay(data, callback);
  };

  // 결제 모듈 성공시 별 개수 변경, merchant_uid 등 결제 정보 보내서 저장하기
  const callback = (res: any) => {
    if (res.success) {
      alert("별 구매가 완료되었습니다.");
      // axios.post("").then().catch();
    } else {
      alert("다시 한 번 시도하여 주십시오.");
      console.log(res);
    }
  };

  return (
    <>
      <Overlay onClick={onClose} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <ModalContainer>
            <ModalForm>
              <button onClick={onClickPayment}>구매하기</button>
            </ModalForm>

            <ModalBackground src={PayModalBackground} alt="modal-background" />
          </ModalContainer>
        </div>
      </Overlay>
    </>
  );
};

export default PayModal;
