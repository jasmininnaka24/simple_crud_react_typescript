import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  age: number;
  isMarried: boolean;
}

interface UserContextType {
  users: User[] | null;
  addUser: (user: User) => void;
  updateUser: (id: string) => void;
  deleteUser: (id: string) => void;
}

const contextInitialValue = {
  users: null,
  addUser: () => null,
  updateUser: () => null,
  deleteUser: () => null,
};

export const UserContext = createContext<UserContextType | undefined>(
  contextInitialValue
);

interface Props {
  children: React.ReactNode;
}

export const UseContextProvider = (props: Props) => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    setUsers([
      { name: "Sarhan", age: 23, isMarried: false },
      { name: "Jasmin", age: 22, isMarried: false },
    ]);
  }, []);

  const addUser = () => null;
  const updateUser = () => null;
  const deleteUser = () => null;

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useContextData = () => {
  const context = useContext<UserContextType | undefined>(UserContext);

  if (!context) {
    throw new Error("useContextData must be used within UserContext");
  }

  return context;
};
