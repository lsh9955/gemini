import styled from "styled-components";

export const ChatWrap = styled.div`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ChatBodyWrap = styled.div`
  background: #2a2a2a;
  height: 50%;
  width: 100%;
`;
export const ChatStatuButtonWrap = styled.div`
  display: flex;

  line-height: 39px;
  width: 100%;
  height: 5%;
  background: #212121;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;

  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  & > button {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    color: #ffffff;
    font-size: 120%;
  }
`;
export const ChatInputWrap = styled.div`
  width: 100%;
  height: 5%;
  background: #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  & > div {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    color: #ffffff;
    font-size: 100%;
  }
  & > button {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    color: #ffffff;
    font-size: 100%;
  }
`;
export const ChatInputForm = styled.div`
  width: 100%;
  height: 30%;
  background: #212121;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5%;
  & > textarea {
    width: 95%;
    height: 95%;
    background: #212121;
    border: transparent;
    outline: none;
    font-size: 18px;
    color: white;
    resize: none;
    font-family: "Inter";
    font-style: normal;
  }
  & > textarea::placeholder {
    color: white;
    font-family: "Inter";
    font-style: normal;
    font-size: 18px;
  }
`;
export const ChatStatus = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  display: flex;
  font-size: 32px;
  line-height: 39px;
  width: 100%;
  height: 10%;
  background: #212121;
  text-align: left;
  color: #ffffff;
  justify-content: center;
  align-items: center;
`;
