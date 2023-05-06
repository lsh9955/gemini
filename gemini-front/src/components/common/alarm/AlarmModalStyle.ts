import styled, { StyledComponentProps } from "styled-components";

interface IMyComponentProps {
  idx: number;
}

type MyComponentProps = StyledComponentProps<
  "div",
  any,
  IMyComponentProps,
  never
>;

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 33%;
  height: 37.5%;
  z-index: 1;
  border: solid 1px;
  border-radius: 10px;
`;

export const AlarmTitle = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 24px;
  border-bottom: #efebf0 solid 1px;
`;

export const AlarmContent = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 0.5rem;
  background-color: ${({ idx }: MyComponentProps) =>
    idx % 2 === 0 ? "#ffffff" : "#E7EBEF"};
`;
