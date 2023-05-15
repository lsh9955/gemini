import styled from "styled-components";
import ShareLinkSvg from "../../assets/img/ShareLinkSvg.svg";

export const EditButtonWrapper = styled.div`
  margin-top: 2%;
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const EditButton = styled.div`
  border: 1px solid white;
  font-size: 0.9rem;
  border-radius: 10px;
  width: 45%;
  padding: 3% 10% 3% 10%;
  color: white;
  display: flex;
  justify-content: center;

  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.8);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
//

// export const LinkImg = styled.div`
//   display: flex;
//   flex-direction: row-reverse;
//   margin-top: 5%;
//   width: 15%;
//   height: 30%;
//   background-image: url(${ShareLinkSvg});
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: contain;
// `;

export const LinkImg = styled.img.attrs({
  src: ShareLinkSvg,
})`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 5%;
  width: 15%;
  height: 30%;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

///////////////////////////////////////////////////////////

export const LikeNicknameWrapper = styled.div`
  //
`;

export const ProfileImg = styled.div`
  //
`;

export const Nickname = styled.div`
  //
`;

export const LikeWrapper = styled.div`
  //
`;

export const Heart = styled.div`
  //
`;

export const LikeContent = styled.div`
  //
`;

// 여기까지 왼쪽

export const GeminiDetialInfoWrapper = styled.div`
  //
`;

export const ToggleWrapper = styled.div`
  //
`;

export const ToggleButton = styled.div`
  //
`;

export const FormLabel = styled.div`
  //
`;

export const TextInput = styled.div`
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
