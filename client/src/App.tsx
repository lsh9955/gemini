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

function App() {
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      const userNum = Math.floor(Math.random() * 200);
      localStorage.setItem("userInfo", `${userNum}`);
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Main />} />
        <Route path="/room" exact render={() => <Room />} />
        <Route path="/room/:id" render={() => <Chat />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
