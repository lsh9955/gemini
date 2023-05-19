import styled from "styled-components";

// export const StyledFollowButton = styled.div`
//   height: 5vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   color: black;
//   background-color: #0e365c;
//   margin-top: auto;
//   border-radius: 5px;
//   color: white;

//   cursor: pointer;

//   //   &:hover {
//   //     background-color: #fce86d;
//   //   }

//   //   &:active {
//   //     background-color: #fada5e;
//   //     box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
//   //   }
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #246aa8;
//   }

//   &:active {
//     background-color: #0b2c4a;
//     box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
//   }
// `;

interface StyledFollowButtonProps {
  isFollowing: boolean;
}

export const StyledFollowButton = styled.div<StyledFollowButtonProps>`
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: black;
  background-color: ${(props) => (props.isFollowing ? "#cc0000" : "#0e365c")};
  margin-top: auto;
  border-radius: 5px;
  color: white;

  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isFollowing ? "#990000" : "#246aa8")};
  }

  &:active {
    background-color: ${(props) => (props.isFollowing ? "#660000" : "#0b2c4a")};
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;
