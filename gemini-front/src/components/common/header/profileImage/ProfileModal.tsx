import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../store/Cookie";
import { logoutAccount } from "../../../../store/UserSlice";

// styled-components
import { Overlay } from "../../alarm/AlarmModalStyle";
import {
  ModalContent,
  ModalContainer,
  FirstContent,
  SecondContent,
} from "../profileImage/ProfileModalStyle";

interface Props {
  onClose: () => void;
}

const ProfileModal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const moveToMypage = () => {
    window.scrollTo(0, 0); // 무한스크롤 버그 잡기 위해서 해두었습니다. 😥
    history.push("/myProfile");
    onClose();
  };
  const moveToLoginPage = () => {
    history.push("/loginpage");
    onClose();
    // 로그아웃 시 쿠키, 로컬스토리지, redux 전부 비우기
    logout();
    dispatch(logoutAccount());
  };

  return (
    <>
      <Overlay onClick={onClose} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <ModalContainer>
            <ModalContent>
              <FirstContent onClick={moveToMypage}>마이페이지</FirstContent>
              <SecondContent onClick={moveToLoginPage}>로그아웃</SecondContent>
            </ModalContent>
          </ModalContainer>
        </div>
      </Overlay>
    </>
  );
};

export default ProfileModal;
