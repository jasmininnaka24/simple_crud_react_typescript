import React, { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id?: number;
  name: string;
  age: number;
  isMarried: boolean;
}

interface UserContextType {
  users: User[] | [];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  fetchUsers: () => void;
  addUser: (user: User) => void;
  updateUser: (id: number, updatedUserData: User) => void;
  deleteUser: (id: number) => void;
}

const userContext = createContext<UserContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const UserContextProvider = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers([
      {
        name: "Sarhan",
        age: 23,
        isMarried: false,
      },
      {
        name: "Jasmin",
        age: 22,
        isMarried: false,
      },
    ]);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api");

      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch the users data: ", response.statusText);
      }
    } catch (error) {
      console.error(
        "An error has occured while fetching the users data: ",
        error
      );
    }
  };

  const addUser = async (user: User) => {
    try {
      const response = await axios.post("/api", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const addedUser = response.data as User;
        setUsers((prevUsers) => [...prevUsers, addedUser]);
      } else {
        console.error("Failed to add a new user: ", response.statusText);
        console.error("Failed to add a new user: ", response.statusText);
      }
    } catch (error) {
      console.error("An error has occured while adding a new user: ", error);
    }
  };

  const updateUser = async (id: number, updatedUserData: User) => {
    try {
      const response = await axios.put(`/api/${id}`, updatedUserData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const updatedUserDataRes = response.data as User;
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? updatedUserDataRes : user))
        );
      } else {
        console.error("Failed to update user's data: ", response.statusText);
      }
    } catch (error) {
      console.error("An error has occured while updating user's data: ", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await axios.delete(`/api/${id}`);

      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        console.error("Failed to delete user's data: ", response.statusText);
      }
    } catch (error) {
      console.error("An error has occured while deleting user's data: ", error);
    }
  };

  return (
    <userContext.Provider
      value={{ users, setUsers, fetchUsers, addUser, updateUser, deleteUser }}
    ></userContext.Provider>
  );
};
