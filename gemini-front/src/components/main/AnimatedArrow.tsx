import React from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import {
  StyledArrowWrapper,
  StyledAnimatedArrow,
} from "./AnimatedArrow.styles";

const AnimatedArrow = () => {
  return (
    <>
      <StyledArrowWrapper>
        <StyledAnimatedArrow>
          <KeyboardDoubleArrowDownIcon
            style={{ fontSize: "15vh", color: "#fff" }} // 원하는 크기로 변경하세요
          />
        </StyledAnimatedArrow>
      </StyledArrowWrapper>
    </>
  );
};

export default AnimatedArrow;
