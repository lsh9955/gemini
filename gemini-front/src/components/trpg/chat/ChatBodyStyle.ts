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
  margin: 4% 0 0 0;
  align-items: center;
  display: flex;

  flex-direction: row;
`;

export const ChatUserWrap = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  margin-right: 5%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & p {
    font-size: 70%;
  }
`;
export const ChatUserImg = styled.img`
  width: 100%;
  height: 40%;
  margin-bottom: 10%;
  border-radius: 4px;
`;
export const ChatUserName = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  flex-direction: column;
  margin: 2% 0;
  & > p {
    width: 100%;
    font-size: 1.2vw;
  }
`;
