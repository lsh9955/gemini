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
`;

export const Button = styled.div`
  margin-top: 1.5rem;
  border: solid #ffffff 1px;
  border-radius: 2px;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  color: white;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  cursor: pointer;
  /* display: inline-block; */

  &:hover {
    color: black;
    background-color: white;
  }
`;

export const Text = styled.div`
  color: #ffffff;
  text-align: center;
  margin-top: 24rem;
  font-size: 1.3rem;
  font-weight: bold;
`;

const earthBackgroundUrl =
  "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg";

// "https://pbs.twimg.com/media/DON8Y_eUMAAV4pi.jpg";

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
