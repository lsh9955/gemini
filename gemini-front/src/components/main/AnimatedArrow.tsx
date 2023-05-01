import React, { FC } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import {
  StyledArrowWrapper,
  StyledAnimatedArrow,
} from "./AnimatedArrow.styles";

const AnimatedArrow: FC = () => {
  return (
    <>
      <StyledArrowWrapper>
        <StyledAnimatedArrow>
          <KeyboardDoubleArrowDownIcon
            htmlColor="black"
            style={{ fontSize: "20vh" }} // 원하는 크기로 변경하세요
          />
        </StyledAnimatedArrow>
      </StyledArrowWrapper>
    </>
  );
};

export default AnimatedArrow;
