import styled from "styled-components";
import createRoom from "../../../assets/img/game/createRoom.jpg";
export const CreateWrap = styled.div`
  width: 30vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${createRoom});
  background-repeat: none;
  background-size: 100% 100%;
`;
export const ModalTransparent = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0px;
`;

export const ModalForm = styled.form`
  width: 80%;
  height: 90%;
  z-index: 12;
  & div {
    & input {
      width: 100%;
      height: 10%;
      font-size: 140%;
    }
  }
  & > input {
    display: none;
  }
`;

export const SelectBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const RoomKeySelectBtn = styled.button<{ passwordOpen: boolean }>`
  width: 50%;
  border: 1px solid #ffffff;
  border-radius: 4px;
  color: white;
  background-color: ${(props) => (props.passwordOpen ? "transparent" : "gray")};
  font-size: 150%;
  margin: 5% 0;
  cursor: pointer;
  :hover {
    background-color: gray;
  }
`;
export const DetailTitle = styled.div`
  color: white;
  font-size: 150%;
  margin: 5% 0;
`;
export const PasswordInput = styled.input<{ passwordOpen: boolean }>`
  display: ${(props) => (props.passwordOpen ? "inline-block" : "none")};
  width: 100%;
  height: 10%;
  font-size: 140%;
  margin-bottom: 5%;
`;
export const MakeRoombtn = styled.input`
  width: 100%;
  height: 10%;
  font-size: 150%;
  margin-bottom: 5%;
  border: 1px solid #ffffff;
  border-radius: 4px;
  color: white;
  background-color: transparent;
  margin-top: 5%;
`;
