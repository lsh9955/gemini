import styled from "styled-components";

// GeminiDetialWrapper
export const GeminiDetialWrapper = styled.div`
  aspect-ratio: 3 / 2;
  width: 50vw;
  position: relative;
  z-index: 10;
  display: flex;
  background-color: #d9d9d9;

  // &::after {
  //   content: "";
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   background-color: rgba(0, 0, 0, 0.5);
  //   z-index: -1;
  // }
`;

// GeminiDetialImgWrapper
export const GeminiDetailImgWrapper = styled.div<{ backgroundImage: string }>`
  width: 50%;
  height: 100%;
  background-image: url(${(props) => props.backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
`;

// LikeNicknameWrapper
export const LikeNicknameWrapper = styled.div`
  height: 21%;
  //   margin-top: 79%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: auto;
  display: flex;
  flex-direction: column;
`;

export const LinkProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProfileImg = styled.div`
  //
`;

export const Nickname = styled.div`
  //
`;

export const LikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Heart = styled.div`
  //
`;

export const LikeContent = styled.div`
  //
`;

// 여기까지 왼쪽 아래부터 오른쪽 😀

export const GeminiDetialInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding-left: 5%;
  padding-right: 5%;
  //
`;

export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 15.5%;
  // margin-top: auto;
  justify-content: center;
  align-items: center;
  //
`;
export const ToggleText = styled.div`
  color: white;
  font-size: 1rem;
  // font-weight:
  //
`;

// 😀토글버튼
interface ToggleButtonProps {
  isOn: boolean;
}
export const ToggleButtonContainer = styled.div<ToggleButtonProps>`
  width: 60px;
  height: 30px;
  // width: 50%;
  // height: 50%;
  border-radius: 15px;
  background-color: ${(props) => (props.isOn ? "#4cd964" : "#d9d9d9")};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10%;
  margin-right: 10%;
`;

export const ToggleButtonCircle = styled.div<ToggleButtonProps>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 1px;
  left: ${(props) => (props.isOn ? "32px" : "1px")};
  transition: left 0.3s ease;
`;
// 토글버튼 end

export const NameInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FormLabel = styled.div`
  color: white;
  white-space: nowrap; // 이 부분을 추가하세요
`;

export const TextInput = styled.input`
  display: block;
  // width: 82.5%;
  width: 80%;
  margin-left: 1.3rem;
  //   padding: 8px;
  margin-bottom: 16px;
  color: white;
  border: none;
  border-bottom: 2px solid white;
  background-color: transparent;
  font-size: 0.9rem;
  font-weight: bold;
  &::placeholder {
    color: white;
    opacity: 0.5;
    font-size: 0.7rem;
  }

  &:focus {
    outline: none;
    border-bottom: 3px solid white;
  }
  //
`;

export const TagArea = styled.div`
  //
`;

export const Tags = styled.div`
  //
`;

export const GeminiInfoButton = styled.div`
  //
`;
