import styled from "styled-components";
export const DialogueMainWrap = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  font-size: 130%;
`;

export const DialogueWrap = styled.div`
  width: 100%;
  height: 85%;
  display: flex;

  align-items: center;
  flex-direction: row;
  color: white;
  font-size: 130%;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;

export const ChatLine = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  display: flex;
  font-size: 32px;
  line-height: 39px;

  height: 10%;
  background: transparent;

  color: #ffffff;
  justify-content: center;
  align-items: center;
`;
export const NextBtn = styled.img`
  width: 7%;
  height: auto;
  cursor: pointer;
  padding: 0 2%;
`;
export const BeforeBtn = styled.img`
  width: 7%;
  height: auto;
  transform: scaleX(-1);
  cursor: pointer;
  padding: 0 2%;
`;

export const ButtonsWrap = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: right;
  flex-direction: row;
`;
export const DiaLogueUser = styled.div`
  width: 20%;
  height: 100%;
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & img {
    width: 45%;
    height: auto;
    border-radius: 4px;
  }
  & div {
    text-align: center;
    width: 100%;
    margin-top: 5%;
    font-size: 80%;
    word-break: keep-all;
  }
`;
