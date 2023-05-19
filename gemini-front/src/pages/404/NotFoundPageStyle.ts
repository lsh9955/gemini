import styled, { keyframes, Keyframes } from "styled-components";
import Moon from "../../assets/img/moon.jpg";

export const Space = styled.div`
  position: relative; // 추가
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000000;
`;

export const NotFound = styled.div`
  position: absolute;
  color: white;
  z-index: 10;
  font-size: 5rem;
  text-align: center;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center; /* 추가 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  z-index: 11;
`;

export const Button = styled.div`
  margin-top: 20rem;
  border: solid #ffffff 1px;
  border-radius: 2px;
  font-size: 20px;
  background-color: transparent;
  color: white;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  cursor: pointer;

  &:hover {
    color: black;
    background-color: white;
  }
`;

export const Text = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 1.3rem;
`;

const rotateAnimation: Keyframes = keyframes`
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 1200px 0px;
  }
`;

export const EarthContainer = styled.div`
  perspective: 400vmin;
  transform-style: preserve-3d;
  width: min(80vmin, 320px);
  height: min(80vmin, 320px);
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const EarthBackground = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background: url(${Moon}) repeat-x;
  background-size: cover;
  border-radius: 50%;
  animation: ${rotateAnimation} 30s infinite linear;
  box-shadow: -50px -10px 50px 10px rgba(0, 0, 0, 0.9) inset;
  /* -10px 0px 15px -7px #151515; */
`;
