import styled from "styled-components";

// 페이지의 가장 바깥쪽을 싸는 스타일
export const AiWrapper = styled.div`
  width: 70%;
  height: auto; // auto로 바꿔줘
  margin-top: 2%;
  margin-left: 15%;
  margin-right: 15%;
  /* border: 1px solid; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// 이미지 생성 버튼
export const AiCreateButton = styled.button`
  width: 25%;
  height: 7vh;
  border: 1px solid;
  margin-left: 75%;
  border-radius: 30px;
  color: white;
  background-color: #0b2b4a;
  &:hover {
    cursor: pointer;
    background-color: #8e98a8;
  }
`;

// 이미지 생성에 필요한 요소 샘플 공간
export const AiSampleWrapper = styled.div`
  width: 65%;
  height: 80vh; // auto로 바꿔줘
  /* border: 1px solid; */
`;

// 실제 이미지 생성에 필요한 박스
export const AiSampleBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1vh;
  border: 1px solid;
  border-radius: 10px;
`;

// 요소가 아무것도 없을 때 보여지는 박스
export const NoneSampleBox = styled.div`
  width: 100%;
  height: 72vh;
  /* margin-top: 1vh; */
  /* border: 1px solid; */
  /* border-radius: 10px; */
`;

// 이미지 생성에 필요한 요소 선택지 공간
export const AiSelectWrapper = styled.div`
  width: 30%;
  height: 80vh; // auto로 바꿔줘
  border: 1px solid;
  display: flex;
  flex-direction: column;
`;

// 이미지 생성에 필요한 요소 제목
export const AiSelectTitle = styled.p`
  width: 100%;
  height: 5%;
  margin-left: 3%;
  margin-bottom: 1%;
  padding-top: 2%;
`;

// 장르 선택할 수 있는 박스
export const GenreSelectBox = styled.div`
  width: 100%;
  height: 10%;
  border: 1px solid;
  border-radius: 10px;
  background-color: #e7ebef;
  display: flex;
  align-items: center;
  padding-left: 5%;
  &:hover {
    cursor: pointer;
    background-color: #8e98a8;
  }
`;
