import React from "react";

// styled-components
import { Overlay } from "../../alarm/AlarmModalStyle";

const LogoutModal: React.FC = () => {
  return (
    <>
      <Overlay>
        <div aria-hidden onClick={(e) => e.stopPropagation()}></div>
      </Overlay>
    </>
  );
};
export default LogoutModal;
