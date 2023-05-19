import styled from "styled-components";

export const Button = styled.button`
  background-color: #fbed6d;
  border: #fbed6d;
  color: #051320;
  margin-top: auto;
  // margin-top: 1rem;
  // margin-left: 1rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 1.5rem;
  padding-right: 1.2rem;
  border-radius: 5px;
  height: 38%;
  cursor: pointer; // 추가

  &:hover {
    background-color: #051320;
    border: #051320;
    color: #fbed6d;
  }
`;

export const Span = styled.span`
  margin: 0;
  line-height: 1.2;
`;

export const IconWrapper = styled.span`
  vertical-align: middle;
`;
