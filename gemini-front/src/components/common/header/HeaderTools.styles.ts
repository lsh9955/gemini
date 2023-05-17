import styled from "styled-components";

export const StyledHeaderTools = styled.div`
  //   cursor: pointer;
  //   height: 70%;
  width: 14%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledProfileImage = styled.img`
  cursor: pointer;
  width: 27%;
  aspect-ratio: 1;
  height: auto;
  border-radius: 50%; // 이 부분을 추가합니다.
  object-fit: cover; // 이미지의 비율을 유지하면서 원형으로 자르기 위해 추가합니다.
  //   background-image: url({ProfileImage});
`;

export const StyledMessage = styled.img`
  cursor: pointer;
  //   height: 70%;
  //   width: auto;
  //   height: auto;
  //   width: 25%;
  height: 4.5vh;
  width: auto;
`;

export const StyledNotification = styled.img`
  cursor: pointer;
  //   height: 70%;
  //   width: auto;
  //   height: auto;
  //   width: 25%;
  height: 4vh;
  width: auto;
`;
