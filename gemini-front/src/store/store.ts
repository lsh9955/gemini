import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "./UserSlice";
import createGeminiReducer from "./CreateGeminiSlice";
// import { RegisterMapReducer } from './RegisterMapSlice';
// import { UserRecommendReducer } from './UserRecommend';

const reducers = combineReducers({
  user: userReducer,
  createGemini: createGeminiReducer,
  //   registerMap: RegisterMapReducer,
  //   userRecommend: UserRecommendReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "registerMap", "userRecommend", "createGemini"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppStore = ReturnType<typeof reducers>;

export default store;
