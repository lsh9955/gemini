import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateRoomModal = ({
  modal,
  closeModal,
}: {
  modal: any;
  closeModal: any;
}) => {
  const [open, setOpen] = useState(false);
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
          <>
            <div>채팅방 생성</div>
            <form action="http://mygemini.co.kr/node/room" method="post">
              <div>
                <input type="text" name="title" placeholder="방 제목" />
              </div>
              <div>
                <input type="text" name="concept" placeholder="컨셉 설명" />
              </div>
              <div>
                <input type="password" name="password" placeholder="비밀번호" />
              </div>
              <input value={userId} name="userId" />
              <div>
                <input type="submit" onSubmit={submitHandler} />
              </div>
            </form>
          </>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateRoomModal;
