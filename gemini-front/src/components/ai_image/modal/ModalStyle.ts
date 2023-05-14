import styled from "styled-components";

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
`;

export const ModalBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 50;
  opacity: 0.7;
`;

export const ModalForm = styled.div`
  position: absolute;
  top: 11.5%;
  left: 11.5%;
  width: 77%;
  height: 77%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  padding: 0.2rem;
`;

export const ConfirmButton = styled.button`
  border: 1px solid #ffffff;
  border-radius: 5px;
  margin-top: 0.5rem;
  margin-right: 2rem;
  padding-bottom: 0.3rem;
  padding-top: 0.3rem;
  padding-left: 1.3rem;
  padding-right: 1.3rem;
  background-color: transparent;
  color: #ffffff;
  font-size: 18px;

  &:hover {
    /* background: #ffffff; */
    /* color: transparent; */
    /* background-color: #124141; */
    mix-blend-mode: color-burn;
  }
`;

export const CancelButton = styled.button`
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding-bottom: 0.3rem;
  padding-top: 0.3rem;
  padding-left: 1.3rem;
  padding-right: 1.3rem;
  background-color: transparent;
  color: #ffffff;
  font-size: 18px;

  &:hover {
    mix-blend-mode: color-burn;
  }
`;

export const Interval = styled.span`
  padding: 1rem;
`;

export const ModalTitle = styled.div`
  justify-content: center;
  text-align: center;
  margin-top: 0.8rem;
`;

export const First = styled.div`
  margin-bottom: 0.5rem;
`;

export const SmallLetter = styled.div`
  font-size: 14px;
`;

export const OneConfirmButton = styled.button`
  border: 1px solid #ffffff;
  border-radius: 5px;
  margin-top: 0.5rem;
  /* margin-right: 2rem; */
  padding-bottom: 0.3rem;
  padding-top: 0.3rem;
  padding-left: 1.3rem;
  padding-right: 1.3rem;
  background-color: transparent;
  color: #ffffff;
  font-size: 18px;

  &:hover {
    /* background: #ffffff; */
    /* color: transparent; */
    /* background-color: #124141; */
    mix-blend-mode: color-burn;
  }
`;
