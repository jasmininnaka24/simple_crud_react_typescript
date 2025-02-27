import React from "react";
import DisplayUser from "./display-user";
import { useLocation } from "react-router-dom";

interface UserDataType {
  id: number;
  name: string;
  age: number;
  isMarried: boolean;
}

export const User: React.FC = () => {
  const location = useLocation();
  const { id, name, age, isMarried } = location.state as UserDataType;

  return <DisplayUser id={id} name={name} age={age} isMarried={isMarried} />;
};

export default User;
