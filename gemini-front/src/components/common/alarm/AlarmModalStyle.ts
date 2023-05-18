import styled, {
  StyledComponentProps,
  keyframes,
  Keyframes,
} from "styled-components";

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

// keyframes

const bounceIn = keyframes`
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }
  30% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  60% {
    transform: scale3d(.9, .9, .9);
  }
  70% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(.97, .97, .97);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

export const StyledBody = styled.body`
  font-size: 11px;
  text-align: center;
  position: relative;
  left: 28%;

  /* background: #f1f1f1; */
`;

export const StyledP = styled.p`
  font-size: 1rem;
  position: relative;
  display: inline-block;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.9);
  color: #f6f6f6;
  animation: ${bounceIn} 1s 1;
  transform-origin: left bottom;

  &:after {
    top: 88%;
    left: 0;
    position: absolute;
    content: "";
    border: 1.5rem solid;
    border-color: #00cc99 transparent transparent #00cc99;
  }
`;

export const Opponent = styled(StyledP)`
  transform-origin: right top;
  background: rgba(0, 0, 0, 0.9);
  margin-top: 1rem;
  border-radius: 10px;

  &:after {
    top: -30%;
    left: auto;
    right: 0;
    border: 1rem solid;
    border-color: transparent rgba(0, 0, 0, 0.9) rgba(0, 0, 0, 0.9) transparent;
  }
`;

export const Interval = styled.div`
  margin-bottom: 8px;
`;

// 배경 백그라운드 알람
export const BackgroundOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0vh;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

export const BackgroundContainer = styled.div`
  position: absolute; // position 값을 absolute로 변경
  top: 18%;
  left: 25%;
  z-index: 1002;
  background-color: rgba(0, 0, 0, 0.5);
  width: 1060px;
  height: 700px;
  text-align: center;
`;

export const BackgroundContent = styled.div`
  /* text-align: center; */
  /* justify-content: center; */
  margin-top: 25px;
  /* margin-left: 75px; */
`;

export const Button = styled.button`
  border: 1px solid #ffffff;
  border-radius: 5px;
  margin-top: 0.5rem;
  margin-right: 2rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  background-color: transparent;
  color: #ffffff;
  font-size: 18px;

  &:hover {
    /* background: #ffffff; */
    /* color: transparent; */
    /* background-color: #124141; */
    mix-blend-mode: color-burn;
  }
`;
