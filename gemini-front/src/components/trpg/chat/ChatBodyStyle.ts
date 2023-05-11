import styled from "styled-components";

export const Messagecontainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5% 5%;
  align-items: center;
  overflow: scroll;
  color: white;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
export const Messagechats = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
`;
