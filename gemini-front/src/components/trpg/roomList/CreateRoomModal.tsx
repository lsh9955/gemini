import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config";
import {
  CreateWrap,
  DetailTitle,
  MakeRoombtn,
  ModalForm,
  ModalTransparent,
  PasswordInput,
  RoomKeySelectBtn,
  SelectBtn,
} from "./CreateRoomModalStyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
};

const CreateRoomModal = ({
  modal,
  closeModal,
}: {
  modal: any;
  closeModal: any;
}) => {
  const [open, setOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const userSeq = useSelector((state: any) => state.user);
  useEffect(() => {
    setOpen(modal);
  }, [modal]);

  const handleClose = () => {
    setOpen(false);
    closeModal();
  };
  let myString: string | null = localStorage.getItem("userInfo");
  let userId: string | number | readonly string[] | undefined =
    myString ?? undefined;
  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(e);
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
            <ModalForm action={`${BASE_URL}/node/room`} method="post">
              <div>
                <DetailTitle>방 제목</DetailTitle>
                <input
                  type="text"
                  name="title"
                  placeholder="방 제목을 적어주세요"
                />
              </div>
              <div>
                <DetailTitle>컨셉</DetailTitle>
                <input
                  type="text"
                  name="concept"
                  placeholder="컨셉을 설명해주세요"
                />
              </div>
              <SelectBtn>
                <RoomKeySelectBtn
                  onClick={() => {
                    setPasswordOpen(false);
                  }}
                  passwordOpen={passwordOpen}
                >
                  공개방
                </RoomKeySelectBtn>
                <RoomKeySelectBtn
                  onClick={() => {
                    setPasswordOpen(true);
                  }}
                  passwordOpen={!passwordOpen}
                >
                  비밀방
                </RoomKeySelectBtn>
              </SelectBtn>
              <div>
                {passwordOpen && (
                  <PasswordInput
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                  />
                )}
              </div>
              <input value={userSeq.nickname} name="userId" />
              <div>
                <MakeRoombtn
                  type="submit"
                  onSubmit={submitHandler}
                  value={"방 생성"}
                />
              </div>
            </ModalForm>
            <ModalTransparent />
          </CreateWrap>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateRoomModal;
