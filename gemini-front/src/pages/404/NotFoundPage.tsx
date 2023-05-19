import React from "react";
import StarryBackground from "./StarryBackGround";
import { useHistory } from "react-router-dom";

// styled-components
import {
  NotFound,
  Wrapper,
  Button,
  EarthContainer,
  EarthBackground,
  Text,
} from "./NotFoundPageStyle";

const NotFoundPage: React.FC = () => {
  const history = useHistory();
  const MoveToHome = () => {
    history.push("/");
  };
  return (
    <>
      <StarryBackground>
        {/* <NotFound>404</NotFound> */}
        <Wrapper>
          <Text>우주에서 길을 잃으셨어요</Text>
          <NotFound>
            4
            <span>
              <EarthContainer>
                <EarthBackground />
              </EarthContainer>
            </span>
            4
          </NotFound>
          <Button onClick={MoveToHome}>메인으로</Button>
        </Wrapper>
      </StarryBackground>
    </>
  );
};

export default NotFoundPage;
