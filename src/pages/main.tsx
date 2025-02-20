import React from "react";
import { useContextData } from "../context/UseContextData";

const Main: React.FC = () => {
  const { users, addUser } = useContextData();

  return (
    <div>
      {users?.map((user) => (
        <div>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Married: {user.isMarried ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default Main;
