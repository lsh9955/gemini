import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";

function PersonalMsgSelect({
  userList,
  sendtargetHandler,
}: {
  userList: Array<string>;
  sendtargetHandler: (targetUser: string) => void;
}) {
  const userSeq = useSelector((state: any) => state.user);
  const [targetUser, setTargetUser] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setTargetUser(event.target.value);
    sendtargetHandler(event.target.value);
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 120 }}
      size="small"
      style={{ color: "black", backgroundColor: "white" }}
    >
      <InputLabel
        id="demo-select-small-label"
        style={{ color: "black", backgroundColor: "white" }}
      >
        유저 선택
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={targetUser}
        label="유저 선택"
        onChange={handleChange}
        style={{ color: "black", backgroundColor: "white" }}
      >
        {userList
          .filter((value: string) => value !== userSeq.nickname)
          .map((value: string) => {
            return <MenuItem value={value}>{value}</MenuItem>;
          })}
      </Select>
    </FormControl>
  );
}

export default PersonalMsgSelect;
