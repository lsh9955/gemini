import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AlarmModal: React.FC<Props> = ({ onClose }) => {
  console.log(1);
  return (
    <>
      <p>알람 실험</p>
    </>
  );
};

export default AlarmModal;
