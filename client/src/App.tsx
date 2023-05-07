import {
  Route,
  Router,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import React, { useEffect } from "react";
import RoomList from "./component/roomList/RoomList";
import CreateRoomModal from "./component/roomList/CreateRoomModal";
import io, { Socket } from "socket.io-client";
import GameRoom from "./component/game/GameRoom";
import GlobalStyles from './GlobalStyles';
const chatSocket = io("http://localhost:5000", {
  transports: ["websocket"],
});

function App() {
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      const userNum = Math.floor(Math.random() * 200);
      localStorage.setItem("userInfo", `${userNum}`);
    }
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        <Route
          path="/room"
          exact
          render={() => <RoomList chatSocket={chatSocket} />}
        />
        <Route path="/test" exact render={() => <CreateRoomModal />} />
        <Route
          path="/room/:id"
          render={() => <GameRoom chatSocket={chatSocket} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
