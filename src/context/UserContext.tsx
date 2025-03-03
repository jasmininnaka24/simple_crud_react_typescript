import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  age: number;
  isMarried: boolean;
}

interface UserContextType {
  users: User[] | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  fetchUsers: () => void;
  addUser: (user: User) => void;
  updateUser: (id: number, updateUser: User) => void;
  deleteUser: (id: number) => void;
}

const userContext = createContext<UserContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const UserContextProvider = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers([
      { name: "Sarhan", age: 23, isMarried: false },
      { name: "Jasmin", age: 22, isMarried: false },
    ]);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api");

      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error("Failed to get the users' data: ", response.statusText);
      }
    } catch (error) {
      console.error("An error has occured while fetching users' data: ", error);
    }
  };

  const addUser = async (user: User) => {
    try {
      console.log(user);
      // const response = await axios.post("/api", user, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // if (response.status === 200) {
      //   setUsers((prevUsers) => [...prevUsers, response.data]);
      // } else {
      //   console.error("Failed to add the user's data: ", response.statusText);
      // }
    } catch (error) {
      console.error("An error has occured while adding user's data: ", error);
    }
  };

  const updateUser = async (id: number, updatedUserData: User) => {
    // try {
    //   const response = await axios.put(`/api/${id}`, updatedUserData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (response.status === 200) {
    //     const updatedUserDataRes = response.data;
    //     // setUsers((prevUsers) =>
    //     //   prevUsers.map((user) => (user.id === id ? updatedUserDataRes : user))
    //     // );
    //   } else {
    //     console.error(
    //       "Failed to update the user's data: ",
    //       response.statusText
    //     );
    //   }
    // } catch (error) {
    //   console.error("An error has occured while updating user's data: ", error);
    // }

    console.log("updated", updatedUserData);
  };

  const deleteUser = async (id: number) => {
    // try {
    //   const response = await axios.delete(`/api/${id}`);

    //   if (response.status === 200) {
    //     // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    //   } else {
    //     console.error(
    //       "Failed to delete the user's data: ",
    //       response.statusText
    //     );
    //   }
    // } catch (error) {
    //   console.error("An error has occured while deleting user's data: ", error);
    // }
    console.log("deleted");
  };

  return (
    <userContext.Provider
      value={{ users, setUsers, fetchUsers, addUser, updateUser, deleteUser }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export const useUserContextFunc = () => {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useUserContextFunc must be used within userContext");
  }

  return context;
};
