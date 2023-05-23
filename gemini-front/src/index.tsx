import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// redux-persist 설정
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
// redux store 위치
import store from "./store/store";
import GlobalStyles from "./styles/GlobalStyle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

export const persistor = persistStore(store);

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <GlobalStyles />
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
