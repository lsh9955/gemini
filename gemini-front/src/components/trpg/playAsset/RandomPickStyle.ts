import styled from "styled-components";

export const PicUser = styled.div<{ pickedUser: any }>`
  font-size: 110%;
  cursor: pointer;
  width: 40%;
  color: ${(props) => (props.pickedUser ? "gray" : "white")};
`;
