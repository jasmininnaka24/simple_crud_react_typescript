import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { User } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const useUserHook = () => {
  const { users, setUsers, fetchUsers, addUser, updateUser, deleteUser } =
    useUserContext();

  const [editingUser, setEditingUser] = useState<number | undefined>(undefined);
  const [dataToUpdate, setDataToUpdate] = useState<User>({
    id: 0,
    name: "",
    age: 0,
    isMarried: false,
  });

  const navigate = useNavigate();

  const handleNavigate = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    name: string,
    age: number,
    isMarried: boolean
  ) => {
    navigate("/user", { state: { id, name, age, isMarried } });
  };

  const handleClickEdit = (
    id: number,
    name: string,
    age: number,
    isMarried: boolean
  ) => {
    setEditingUser(id);
    setDataToUpdate({
      id,
      name,
      age,
      isMarried,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
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

  const handleSave = (id: number, updatedUserData: User) => {
    updateUser(id, updatedUserData);
    handleCancel();
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      deleteUser(id);
      handleCancel();
    }
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

  return {
    // from user context
    users,
    setUsers,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    // state hooks
    editingUser,
    setEditingUser,
    dataToUpdate,
    setDataToUpdate,
    // functions
    handleNavigate,
    handleClickEdit,
    handleChange,
    handleSave,
    handleDelete,
    handleCancel,
  };
};

export default useUserHook;
