import { FC, useState } from "react";
import { StyledFollowButton } from "./FollowButton.styles";
import axios from "axios";
import axiosInstanceWithAccessToken from "../../../utils/AxiosInstanceWithAccessToken";

interface FollowButtonProps {
  isFollowing: boolean;
  nickname: string;
  setIsFollowing: (value: boolean) => void;

  increaseFollowerNum: () => void;
  decreaseFollowerNum: () => void;
}

const FollowButton: FC<FollowButtonProps> = ({
  isFollowing,
  nickname,
  setIsFollowing,
  increaseFollowerNum,
  decreaseFollowerNum,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        // Perform the unfollow operation
        try {
          await axiosInstanceWithAccessToken.delete(`/user-service/profile/`, {
            data: { nickname: nickname },
          });
          console.log("Unfollow request sent successfully");
          setIsFollowing(false);
          decreaseFollowerNum();
        } catch (error) {
          console.error("Failed to send unfollow request: ", error);
        }
      } else {
        // Perform the follow operation
        try {
          await axiosInstanceWithAccessToken.post("/user-service/profile", {
            nickname: nickname,
          });
          console.log("Follow request sent successfully");
          setIsFollowing(true);
          increaseFollowerNum();
        } catch (error) {
          console.error("Failed to send follow request: ", error);
        }
      }
    } catch (error) {
      console.error("Failed to toggle follow status: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledFollowButton isFollowing={isFollowing} onClick={handleFollow}>
      {isLoading ? "Loading..." : isFollowing ? "언팔로우" : "팔로우하기"}
    </StyledFollowButton>
  );
};

export default FollowButton;
