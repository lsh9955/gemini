import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Header from "./components/common/header/Header";
import Main from "./pages/main/Main";
import Login from "./pages/auth/Login";
import LoginSuccess from "./pages/auth/LoginSuccess";

import SelectPairchild from "./pages/auth/SelectPairchild";
import MyProfile from "./pages/profile/MyProfile";
import AiImage from "./pages/ai_image/AiImage";
import UserProfile from "./pages/profile/UserProfile";
import UserGeminiDetail from "./components/geminiDetail/UserGeminiDetail";
import MyGeminiDetail from "./components/geminiDetail/MyGeminiDetail";
import NewGeminiDetail from "./components/geminiDetail/NewGeminiDetail";

import SocketMain from "./components/trpg/SocketMain";
import PrivacyRule from "./pages/PrivacyRule";

import NotFoundPage from "./pages/404/NotFoundPage";
const AppRoutes = () => {
  const location = useLocation();
  const pathsWithoutHeader = [
    "/loginPage",
    "/loginSuccess",
    "/selectPairchild",
  ];

  // NotFoundPage를 위한 state 변수
  const [isNotFoundPage, setIsNotFoundPage] = React.useState(false);
  const shouldShowHeader =
    !pathsWithoutHeader.includes(location.pathname) && !isNotFoundPage;

  return (
    <>
      {shouldShowHeader && <Header />}
      <Switch>
        <Route exact path="/" component={Main} />

        <Route exact path="/loginPage" component={Login} />
        <Route exact path="/loginSuccess" component={LoginSuccess} />

        <Route exact path="/selectPairchild" component={SelectPairchild} />
        <Route exact path="/myProfile" component={MyProfile} />
        <Route exact path="/userProfile/:nickname" component={UserProfile} />

        <Route exact path="/aiImage" component={AiImage} />
        <Route exact path="/geminidetail-user" component={UserGeminiDetail} />
        <Route exact path="/geminidetail-my" component={MyGeminiDetail} />
        <Route exact path="/geminidetail-new" component={NewGeminiDetail} />
        <Route path="/room" component={SocketMain} />
        <Route exact path="/privacy" component={PrivacyRule} />

        {/* ... */}
        {/* NotFoundPage에는 header 안보이게 */}
        <Route
          path="*"
          render={() => {
            setIsNotFoundPage(true);
            return <NotFoundPage />;
          }}
        />
      </Switch>
    </>
  );
};

export default AppRoutes;
