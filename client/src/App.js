import {
  Route,
  Router,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import Chat from "./component/Chat";
import Room from "./component/Room";
import Main from "./component/Main";
import React, { useEffect, useState } from "react";

function App({ userId }) {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      const userNum = Math.floor(Math.random() * 200);
      localStorage.setItem("userInfo", `${userNum}`);
      setUserInfo(userNum);
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Main userId={userInfo} />} />
        <Route path="/room" exact render={() => <Room userId={userInfo} />} />
        <Route path="/room/:id" render={() => <Chat userId={userInfo} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
