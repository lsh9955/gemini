import styled, { StyledComponentProps } from "styled-components";

interface AlarmContentProps
  extends StyledComponentProps<"div", any, {}, never> {
  idx: number;
}

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 8vh;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 76%;
  transform: translate(-50%, -50%);
  width: 20%;
  z-index: 1000;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const AlarmTitle = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 24px;
  border-bottom: #efebf0 solid 1px;
`;

export const AlarmContent = styled.div<AlarmContentProps>`
  text-align: center;
  font-size: 18px;
  padding: 0.5rem;
  background-color: ${({ idx }) => (idx % 2 === 0 ? "#ffffff" : "#E7EBEF")};
`;

export const NoAlarmContent = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 0.5rem;
  border-radius: 10px;
`;

export const AlarmContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  border-radius: 10px;
`;
