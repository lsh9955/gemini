import React, { FC } from "react";
import {
  StyledMyProfileContentBody,
  ImageWrapper,
  EndMessage,
  //   InfiniteScrollWrapper,
} from "./MyProfileContentBody.styles";
import InfiniteScroll from "react-infinite-scroll-component";

// interface ImageProps {
//   imageUrl: string;
// }
interface ImageProps {
  imageUrl: string;
  pk: number;
  onClick: () => void;
}

// const Image: FC<ImageProps> = ({ imageUrl }) => {
//   return <ImageWrapper style={{ backgroundImage: `url(${imageUrl})` }} />;
// };
const Image: FC<ImageProps> = ({ imageUrl, pk, onClick }) => {
  return (
    <ImageWrapper
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={onClick}
    />
  );
};

interface MyProfileContentBodyProps {
  images: { imageUrl: string; geminiPk: number }[];
  hasMore: boolean;
  loadMoreImages: () => void;

  // for modal 😀
  onImageClick: (geminiPk: number) => void;
}

const MyProfileContentBody: FC<MyProfileContentBodyProps> = ({
  images,
  hasMore,
  loadMoreImages,
  onImageClick,
}) => {
  return (
    // <InfiniteScrollWrapper>
    <InfiniteScroll
      style={{ overflowY: "hidden" }}
      dataLength={images.length}
      next={loadMoreImages}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <EndMessage>모든 제미니를 탐색했습니다.</EndMessage>
        </p>
      }
    >
      <StyledMyProfileContentBody>
        {images.map((image, index) => (
          <Image
            key={index}
            // imageUrl={imageUrl}
            imageUrl={image.imageUrl}
            pk={image.geminiPk} // 이미지 객체에 pk가 포함되어 있다고 가정합니다.
            onClick={() => onImageClick(image.geminiPk)}
          />
        ))}
      </StyledMyProfileContentBody>
    </InfiniteScroll>
  );
};

export default MyProfileContentBody;
