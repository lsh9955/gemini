import React, { FC } from "react";
import {
  StyledMyProfileContentBody,
  ImageWrapper,
  EndMessage,
  //   InfiniteScrollWrapper,
} from "./MyProfileContentBody.styles";
import InfiniteScroll from "react-infinite-scroll-component";

interface ImageProps {
  imageUrl: string;
}

const Image: FC<ImageProps> = ({ imageUrl }) => {
  return <ImageWrapper style={{ backgroundImage: `url(${imageUrl})` }} />;
};

interface MyProfileContentBodyProps {
  images: string[];
  hasMore: boolean;
  loadMoreImages: () => void;
}

const MyProfileContentBody: FC<MyProfileContentBodyProps> = ({
  images,
  hasMore,
  loadMoreImages,
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
        {images.map((imageUrl, index) => (
          <Image key={index} imageUrl={imageUrl} />
        ))}
      </StyledMyProfileContentBody>
    </InfiniteScroll>
  );
};

export default MyProfileContentBody;
