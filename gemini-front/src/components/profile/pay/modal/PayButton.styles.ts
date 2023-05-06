import styled from "styled-components";
import PayStarImg from "../../../../assets/img/PayStar.png";

export const StyledPayButton = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: black;
  background-color: #fbed6d;
  margin-top: auto;
  border-radius: 5px;

  cursor: pointer;
  transition: background-color 0.3s ease;

  // &:hover {
  //   background-color: #fce86d;
  // }

  // &:active {
  //   background-color: #fada5e;
  //   box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  // }
  &:hover {
    background-color: #f9e258;
  }

  &:active {
    background-color: #f5d741;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

// export const StarImgWrapper = styled.div`
//   background-image: url(${PayStarImg});
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
//   height: 1rem;
// `;

export const StarImgWrapper = styled.img.attrs({
  src: PayStarImg,
  alt: "Pay Star",
})`
  margin-left: 0.3rem;
  height: 1rem;
`;

export const StyledPayButtonText = styled.div`
  font-size: 1rem;
`;
