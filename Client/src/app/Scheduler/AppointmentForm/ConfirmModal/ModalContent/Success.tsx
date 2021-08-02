import React, { FC } from "react";
import { SuccessMark } from "../../../../../components";

export const Success: FC = () => (
  <>
    <h1>Your appointment has been booked!</h1>
    <SuccessMark />
    <h3 style={{ margin: "10px" }}>You can close out of this</h3>
  </>
);
