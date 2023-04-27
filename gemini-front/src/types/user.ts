export interface User {
  id: string;
  password: string;
  name: string;
}

export type UserState = {
  user: {
    password: string;
  };
};
