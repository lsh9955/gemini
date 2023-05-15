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
          <NotFound>
            4
            <span>
              <EarthContainer>
                <EarthBackground />
              </EarthContainer>
            </span>
            4
          </NotFound>
          <Text>Where is your Gemini?</Text>
          <Button onClick={MoveToHome}>HOME</Button>
        </Wrapper>
      </StarryBackground>
    </>
  );
};

export default NotFoundPage;
