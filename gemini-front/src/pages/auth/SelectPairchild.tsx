import React, { FC } from "react";
import { SelectPairchildBg } from "./SelectPairchild.styles";
import SelectPairchildComp from "../../components/auth/SelectPairchildComp";

const SelectPairchild: FC = () => {
  return (
    <>
      <SelectPairchildBg>
        <SelectPairchildComp></SelectPairchildComp>
      </SelectPairchildBg>
    </>
  );
};

export default SelectPairchild;
