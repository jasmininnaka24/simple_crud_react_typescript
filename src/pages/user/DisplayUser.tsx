import React from "react";

interface UserProps {
  name: string;
  age: number;
  isMarried: boolean;
}

const DisplayUser: React.FC<UserProps> = ({ name, age, isMarried }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Married: {isMarried ? "Yes" : "No"}</p>
    </div>
  );
};

export default DisplayUser;
