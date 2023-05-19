import { FC } from "react";
import styled from "styled-components";

export const GalleryWrapper = styled.div`
  width: 100%;
  height: auto;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const GalleryItem = styled.img`
  width: 250px;
  height: 333px;
  border-radius: 10%;
  padding: 5px;
`;

export const GalleryTitle = styled.p`
  width: 100%;
  height: 5%;
  padding-left: 20%;
  padding-bottom: 2%;
`;

export const GalleryTitleName = styled.div`
  padding: 3% 0;
  font-size: 150%;
`;

export const EmptyBlock = styled.div`
  width: 100%;
  height: 100vh;
`;
export const GalleryWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const ContentWrap = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

// 15% 3%
export const ImgWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4%;
  & > img {
    width: 16vw;
    height: 21vw;
    border-radius: 4px;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s ease; // 추가
    &:hover {
      transform: scale(1.2); // 추가
    }
  }
`;

// interface StyledImgProps {
//   imageUrl: string;
//   geminiPk: number;
// }

// export const StyledImg = styled.img.attrs<StyledImgProps>((props) => ({
//   src: props.imageUrl,
//   alt: `Image ${props.geminiPk}`,
// }))<StyledImgProps>`
//   // 여기에 필요한 스타일을 적용하십시오.
// `;

interface StyledImgProps {
  imageUrl: string;
  geminiPk: number;
  onClick: (geminiPk: number) => void; // 클릭 이벤트를 처리하는 함수를 추가합니다.
}

export const StyledImg = styled.img.attrs<StyledImgProps>((props) => ({
  src: props.imageUrl,
  alt: `Image ${props.geminiPk}`,
}))<StyledImgProps>`
  // 여기에 필요한 스타일을 적용하십시오.
`;

interface StyledRankingProps {
  imageUrl: string;
  galleryNo: number;
  emotions: string[];
  onClick: (geminiPk: number) => void; // 클릭 이벤트를 처리하는 함수를 추가합니다.
}

export const StyledRankingImg = styled.img.attrs<StyledRankingProps>(
  (props) => ({
    src: props.imageUrl,
    alt: `Image ${props.galleryNo}`,
  })
)<StyledRankingProps>`
  // 여기에 필요한 스타일을 적용하십시오.
`;
