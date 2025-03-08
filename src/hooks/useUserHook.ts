import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UserDataType } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const useUserHook = () => {
  const { users, addUser, updateUser, deleteUser } = useUserContext();

  // usestate hooks for adding data
  const [dataToAdd, setDataToAdd] = useState({
    id: 0,
    name: "",
    age: 0,
    isMarried: false,
  });

  // usestate hooks for editing data
  const [editingUser, setEditingUser] = useState<number | undefined>(undefined);
  const [dataToUpdate, setDataToUpdate] = useState<UserDataType>({
    id: 0,
    name: "",
    age: 0,
    isMarried: false,
  });

  const navigate = useNavigate();

  const handleEditClick = (userData: UserDataType) => {
    setEditingUser(userData.id);
    setDataToUpdate(userData);
  };

  // Adding Data
  const handleChangeForAddingData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { type, name, value } = e.target;
    setDataToAdd((prev) => ({
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

  const handleAddUser = (
    e: React.FormEvent<HTMLFormElement>,
    userData: UserDataType
  ) => {
    e.preventDefault();
    addUser(userData);
  };

  // Editing Data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { type, name, value } = e.target;

    setDataToUpdate((prev) => ({
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

  const handleSave = (userData: UserDataType) => {
    updateUser(userData.id, userData);
    handleCancel();
  };

  const handleCancel = () => {
    setEditingUser(undefined);
    setDataToUpdate({
      id: 0,
      name: "",
      age: 0,
      isMarried: false,
    });
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      deleteUser(id);
      handleCancel();
    }
  };

  const handleNavigate = (user: UserDataType) => {
    navigate("/user", { state: user });
  };

  return {
    // from userContext
    users,
    // from usestates
    dataToAdd,
    editingUser,
    dataToUpdate,
    // functions
    handleNavigate,
    handleChangeForAddingData,
    handleAddUser,
    handleEditClick,
    handleChange,
    handleSave,
    handleCancel,
    handleDelete,
  };
};

export default useUserHook;
