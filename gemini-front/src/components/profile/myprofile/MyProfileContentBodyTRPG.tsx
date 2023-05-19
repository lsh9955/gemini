// 얘는 자생하는 컴포넌트 알아서 스크롤 마지막에 요청을 보내서 채워나감. prop으로 뭘 안받는다.

import React, { FC, useEffect } from "react";
import {
  StyledMyProfileContentBody,
  ImageWrapper,
  EndMessage,
  TRPGImageWrapper,
  TRPGImageItem,
  StyledMyProfileTRPGContentBody,
  //   InfiniteScrollWrapper,
} from "./MyProfileContentBody.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosInstanceWithAccessToken from "../../../utils/AxiosInstanceWithAccessToken";

interface MemoriesDataProps {
  poseNo: number;
  background: string;
  poseImages: string[];
  // onClick: () => void;
}

const TRPGImage: FC<MemoriesDataProps> = ({
  poseNo,
  background,
  poseImages,
  // onClick,
}) => {
  useEffect(() => {
    console.log(`MyProfileContentBodyTRPG로 들어가는 images`);
    console.log(`poseNo,
    background,
    poseImages, 순서로 로깅합니다 ${poseNo} ${background} ${poseImages}`);
    console.log(poseNo);
    console.log(background);
    console.log(poseImages);
  }, []);

  return (
    <TRPGImageWrapper
      // onClick={onClick}
      background={background}
    >
      {poseImages.map((imageUrl, index) => (
        <TRPGImageItem
          key={index}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ))}
    </TRPGImageWrapper>
  );
};

interface MyProfileContentBodyTRPGProps {
  images: {
    poseNo: number;
    background: string;
    poseImages: string[];
    // onClick: () => void;
  }[];

  // for modal 😀
  onImageClick: (geminiPk: number) => void;
}

const MyProfileContentBodyTRPG: FC<MyProfileContentBodyTRPGProps> = ({
  images,

  // onImageClick, // 괜찮은지 봐야함.
}) => {
  useEffect(() => {
    console.log(`MyProfileContentBodyTRPG로 들어가는 images`);
    console.log(images);
  }, []);
  return (
    <StyledMyProfileTRPGContentBody>
      {images.map((imageObj, index) => (
        <TRPGImage
          poseNo={imageObj.poseNo}
          background={imageObj.background}
          poseImages={imageObj.poseImages}
          // onClick={() => onImageClick(imageObj.poseNo)}
        />
      ))}
    </StyledMyProfileTRPGContentBody>
  );
};

export default MyProfileContentBodyTRPG;
