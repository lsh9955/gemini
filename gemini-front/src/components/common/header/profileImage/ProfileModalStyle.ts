import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 77%;
  transform: translate(-50%, 0);
  width: 10%;
  z-index: 1000;
  border-radius: 10px;
  /* background-color: #ffffff; */
  display: flex;
  flex-direction: column;
  top: auto;
`;

export const ModalContent = styled.div`
  text-align: center;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5); // 투명도를 적용합니다.
  color: #ffffff;
  z-index: 10;
  border-radius: 10px;
`;

export const FirstContent = styled.div`
  text-align: center;
  font-size: 20px;
  z-index: 10;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  border-bottom: #efebf0 solid 0.3px;
`;

export const SecondContent = styled.div`
  text-align: center;
  font-size: 20px;
  z-index: 10;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
`;

export const MessegeModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 86%;
  transform: translate(-50%, 0);
  width: 10%;
  z-index: 1000;
  border-radius: 10px;
  /* background-color: #ffffff; */
  display: flex;
  flex-direction: column;
  top: auto;
`;

export const Content = styled.div`
  text-align: center;
  font-size: 20px;
  z-index: 10;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
`;
