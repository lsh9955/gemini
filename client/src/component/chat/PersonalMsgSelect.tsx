import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function PersonalMsgSelect({ userList, sendtargetHandler }: { userList: Array<string>, sendtargetHandler: (targetUser: string) => void }) {
    const [targetUser, setTargetUser] = useState('');
    console.log(userList)
    const handleChange = (event: SelectChangeEvent) => {
        setTargetUser(event.target.value);
        sendtargetHandler(event.target.value)
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">유저 선택</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={targetUser}
                label="유저 선택"
                onChange={handleChange}
            >

                {userList.filter((value: string) => value !== localStorage.getItem("userInfo")).map((value: string) => {
                    return (
                        <MenuItem value={value}>{value}</MenuItem>
                    )
                })}

            </Select>
        </FormControl>
    )
}

export default PersonalMsgSelect