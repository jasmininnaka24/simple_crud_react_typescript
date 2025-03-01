import React from "react";
import DisplayUser from "./display-user";
import { useLocation } from "react-router-dom";

interface UserDataType {
  name: string;
  age: number;
  isMarried: boolean;
}

export const User: React.FC = () => {
  const location = useLocation();
  const { name, age, isMarried } = location.state as UserDataType;

  return <DisplayUser name={name} age={age} isMarried={isMarried} />;
};

export default User;
