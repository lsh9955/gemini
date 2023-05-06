import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 33%;
  height: 37.5%;
  z-index: 1;
`;

export const ModalBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 50;
  opacity: 0.7;
`;

export const ModalForm = styled.div`
  position: absolute;
  top: 11.5%;
  left: 11.5%;
  width: 77%;
  height: 77%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbed6d;
  width: 60%;
  height: 18%;
  font-size: 18px;
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

export const LogoImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 1rem;

  @media screen and (max-width: 680px) {
    width: 14px;
    height: 14px;
  }
`;

export const PayTitle = styled.div`
  position: fixed;
  color: #ffffff;
  top: 22%;
  font-size: 16px;
  text-align: center;

  @media screen and (max-width: 680px) {
    font-size: 12px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 50%;
  height: 100%;
  border: none;
  border-bottom: 1px solid #ffffff;
  font-size: 16px;
  z-index: 101;
  background-color: transparent;
  color: #ffffff;
`;

export const InputSpan = styled.span`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: #ffffff;
  margin-right: 0.7rem;
`;
