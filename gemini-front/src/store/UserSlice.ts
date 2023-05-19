import { createSlice } from "@reduxjs/toolkit";
import { AppStore } from "./store";

const initialState = {
  isLogged: false,
  userPk: null,
  username: null,
  nickname: null,
  description: null,
  profileBackground: null,
  profileImgUrl: null,
  star: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAccount(state, action) {
      state.isLogged = true;
      state.userPk = action.payload.userPk;
      state.username = action.payload.username;
      state.nickname = action.payload.nickname;
      state.description = action.payload.description;
      state.profileBackground = action.payload.profileBackground;
      state.profileImgUrl = action.payload.profileImgUrl;
      state.star = action.payload.star;
    },
    logoutAccount(state) {
      state.isLogged = false;
      state.userPk = null;
      state.username = null;
      state.nickname = null;
      state.description = null;
      state.profileBackground = null;
      state.profileImgUrl = null;
      state.star = null;
    },
    updateStar(state, action) {
      state.star = action.payload;
    },
    updateHeaderProfileImg(state, action) {
      state.profileImgUrl = action.payload;
    },
  },
});
//
export const {
  loginAccount,
  logoutAccount,
  updateStar,
  updateHeaderProfileImg,
} = UserSlice.actions;
export type RootState = AppStore;
export default UserSlice.reducer;
