import React, { FC } from "react";
import { useHistory, useParams } from "react-router-dom";

type UserProfileParams = {
  nickname: string;
};

const UserProfile: FC = () => {
  const { nickname } = useParams<UserProfileParams>();

  return (
    <>
      {/* 렌더링시 nickname을 사용할 수 있음. */}
      <h1>{nickname}'s Profile</h1>
    </>
  );
};

export default UserProfile;
