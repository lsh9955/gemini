import {
  Route,
  Router,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import React, { useEffect } from "react";
import RoomList from "./component/roomList/RoomList";
import Game from "./component/game/Game";
import CreateRoomModal from "./component/roomList/CreateRoomModal";

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
        <Route path="/room" exact render={() => <RoomList />} />
        <Route path="/test" exact render={() => <CreateRoomModal />} />
        <Route path="/room/:id" render={() => <Game />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
