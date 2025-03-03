import React, { useState } from "react";
import { useUserContextFunc } from "../../context/UserContext";

const AddUser = () => {
  const { addUser } = useUserContextFunc();

  interface UserDataType {
    name: string;
    age: number;
    isMarried: boolean;
  }

  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    age: 0,
    isMarried: false,
  });

  const handleChangeForAddingUser = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();

    const { name, value, type } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : value === "true"
          ? true
          : value === "false"
          ? false
          : value,
    }));
  };

  const addUserFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(userData);
  };
  return (
    <div>
      <form onSubmit={addUserFunc}>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          onChange={handleChangeForAddingUser}
          value={userData.name}
        />
        <input
          type="number"
          name="age"
          required
          placeholder="Name"
          onChange={handleChangeForAddingUser}
          value={userData.age}
        />
        <select
          name="isMarried"
          onChange={handleChangeForAddingUser}
          value={userData.isMarried.toString()}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button>Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
