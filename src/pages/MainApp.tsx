import { Link, useNavigate } from "react-router-dom";
import { useUserContextFunc } from "../context/UserContext";
import { useState } from "react";

const MainApp = () => {
  const navigate = useNavigate();
  const { users, addUser } = useUserContextFunc();

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

  const handleNavigate = (name: string, age: number, isMarried: boolean) => {
    navigate("/user", { state: { name, age, isMarried } });
  };

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
          : type === "true"
          ? true
          : type === "false"
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

      {users?.map(({ age, name, isMarried }) => (
        <>
          <Link to={`/user`} state={{ age, name, isMarried }}>
            {name}
          </Link>

          <button onClick={() => handleNavigate(name, age, isMarried)}>
            User
          </button>
          <br />
        </>
      ))}
    </div>
  );
};

export default MainApp;
