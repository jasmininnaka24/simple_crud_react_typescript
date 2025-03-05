import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  age: number;
  isMarried: boolean;
}

interface AddUser {
  name: string;
  age: number;
  isMarried: boolean;
}

interface UserContextType {
  users: User[] | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  fetchUsers: () => void;
  addUser: (user: AddUser) => void;
  updateUser: (id: number, updatedUserData: User) => void;
  deleteUser: (id: number) => void;
}

const userContext = createContext<UserContextType | undefined>(undefined);

interface Prop {
  children: React.ReactNode;
}
export const UserContextProvider = (prop: Prop) => {
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    setUsers([
      { id: 1, name: "Sarhan", age: 23, isMarried: false },
      { id: 2, name: "Jasmin", age: 22, isMarried: false },
    ]);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api");

      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users data: ", response.statusText);
      }
    } catch (error) {
      console.error("An error has occured while fetching the data: ", error);
    }
  };

  const addUser = async (user: AddUser) => {
    // try {
    //   const response = await axios.put("/api", user, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.status === 200) {
    //     setUsers((prev) => [...prev, response.data]);
    //   } else {
    //     console.error("Failed to add user data: ", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("An error has occured while adding the data: ", error);
    // }
    console.log("Added");
  };

  const updateUser = async (id: number, updatedUserData: User) => {
    // try {
    //   const response = await axios.put(`/api/${id}`, updatedUserData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.status === 200) {
    //     const updatedUserDataRes = response.data as User;
    //     setUsers((prev) =>
    //       prev.map((user) => (user.id === id ? updatedUserDataRes : user))
    //     );
    //   } else {
    //     console.error("Failed to update user data: ", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("An error has occured while updating the data: ", error);
    // }
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? updatedUserData : user))
    );
  };

  const deleteUser = async (id: number) => {
    // try {
    //   const response = await axios.delete(`/api/${id}`);

    //   if (response.status === 200) {
    //     setUsers((prev) => prev.filter((user) => user.id !== id));
    //   } else {
    //     console.error("Failed to update delete data: ", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("An error has occured while deleting the data: ", error);
    // }
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <userContext.Provider
      value={{ users, setUsers, fetchUsers, addUser, updateUser, deleteUser }}
    >
      {prop.children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useUserContext must be used within userContext");
  }

  return context;
};
