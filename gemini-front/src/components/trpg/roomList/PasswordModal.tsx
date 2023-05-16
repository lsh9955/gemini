import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config";
import {
  CheckPwButton,
  CreateWrap,
  DetailTitle,
  ModalForm,
  ModalTransparent,
  PasswordInput,
  RoomKeySelectBtn,
  SelectBtn,
} from "./PasswordModalStyle";
import { useHistory } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
};

const PasswordModal = ({
  pwModal,
  closePwModal,

  targetPwRoom,
}: {
  pwModal: any;
  closePwModal: any;

  targetPwRoom: any;
}) => {
  const [open, setOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [wrongPw, setWrongPw] = useState(false);
  const userSeq = useSelector((state: any) => state.user);
  const pwRef = useRef<any>(null);
  const history = useHistory();
  console.log(userSeq);
  useEffect(() => {
    setOpen(pwModal);
  }, [pwModal]);

  const handleClose = () => {
    setOpen(false);
    closePwModal();
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  const checkPassword = () => {
    console.log(pwRef.current.value, targetPwRoom.password);
    if (String(pwRef.current.value) !== String(targetPwRoom.password)) {
      setWrongPw(true);
      if (pwRef.current) {
        pwRef.current.value = null;
      }
    } else {
      history.push(`/room/${targetPwRoom["_id"]}`);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateWrap>
            <ModalForm
              action={`https://mygemini.co.kr/node/pwroom/${targetPwRoom}`}
              method="post"
            >
              <div>
                <DetailTitle>비밀번호 입력</DetailTitle>
                <input
                  type="text"
                  name="password"
                  placeholder="비밀번호 입력"
                  ref={pwRef}
                />
              </div>
              <CheckPwButton
                onClick={(e) => {
                  e.preventDefault();
                  checkPassword();
                }}
              >
                확인
              </CheckPwButton>
              {wrongPw && (
                <>
                  <p style={{ color: "white" }}>비밀번호가 틀렸습니다.</p>
                  <p style={{ color: "white" }}> 다시 확인해 주세요</p>
                </>
              )}
            </ModalForm>

            <ModalTransparent />
          </CreateWrap>
        </Box>
      </Modal>
    </div>
  );
};

export default PasswordModal;
