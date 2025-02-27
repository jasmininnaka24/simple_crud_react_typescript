import React from "react";

interface UserProps {
  id: number;
  name: string;
  age: number;
  isMarried: boolean;
}

const DisplayUser: React.FC<UserProps> = ({ id, name, age, isMarried }) => {
  return (
    <div>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Married: {isMarried ? "Yes" : "No"}</p>
    </div>
  );
};

export default DisplayUser;
