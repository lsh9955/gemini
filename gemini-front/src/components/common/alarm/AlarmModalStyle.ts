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
  top: 0;
  left: 77%;
  transform: translate(-50%, 0);
  width: 20%;
  z-index: 1000;
  border-radius: 10px;
  /* background-color: #ffffff; */
  display: flex;
  flex-direction: column;
  top: auto;
  max-height: 40vh; /* AlarmContentWrapper의 최대 높이 */
  overflow-y: auto; /* 내용이 AlarmContentWrapper 크기를 초과할 경우 스크롤바 생성 */

  /* 커스텀 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #051320;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #151515;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const AlarmTitle = styled.div`
  /* border-bottom: #efebf0 solid 0.3px; */
  text-align: center;
  font-size: 20px;
  padding: 0.6rem;
  background-color: rgba(0, 0, 0, 0.5); // 투명도를 적용합니다.
  color: #ffffff;
  z-index: 10;
`;

export const AlarmContent = styled.div<AlarmContentProps>`
  border-top: #efebf0 solid 0.3px;
  text-align: center;
  font-size: 18px;
  padding: 0.6rem;
  background-color: rgba(0, 0, 0, 0.5); // 투명도를 적용합니다.
  color: #efebf0;
  /* background-color: ${({ idx }) =>
    idx % 2 === 0 ? "#ffffff" : "#061829"}; */
`;

export const AlarmContentWrapper = styled.div`
  border-radius: 10px;
`;

export const NoAlarmContent = styled.div`
  border-top: #efebf0 solid 0.3px;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 20px;
  padding: 0.5rem;
  /* border-radius: 10px; */
  color: white;
`;

export const GeminiAlarm = styled.div`
  position: fixed;
  top: 8%;
  left: 77%;
  transform: translate(-50%, 0);
  width: 20%;
  z-index: 1000;
  border-radius: 10px;
  /* background-color: #ffffff; */
  display: flex;
  flex-direction: column;
`;

export const LightOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 8vh;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 9999;
`;
