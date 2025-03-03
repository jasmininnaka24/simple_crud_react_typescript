import { Link, useNavigate } from "react-router-dom";
import { useUserContextFunc } from "../../context/UserContext";
import React, { useState } from "react";

interface User {
  name: string;
  age: number;
  isMarried: false;
}

const DisplayUsers = () => {
  const navigate = useNavigate();
  const { users, updateUser, deleteUser } = useUserContextFunc();

  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [formDataToEdit, setFormDataToEdit] = useState<{
    name: string;
    age: number;
    isMarried: boolean;
  }>({
    name: "",
    age: 0,
    isMarried: false,
  });

  const handleNavigate = (name: string, age: number, isMarried: boolean) => {
    navigate("/user", { state: { name, age, isMarried } });
  };

  const handleClickEdit = (name: string, age: number, isMarried: boolean) => {
    setEditingUser(name);
    setFormDataToEdit({ name, age, isMarried });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, type, value } = e.target;

    setFormDataToEdit((prev) => ({
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

  const handleSave = () => {
    updateUser(2, formDataToEdit);
    handleCancel();
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormDataToEdit({
      name: "",
      age: 0,
      isMarried: false,
    });
    console.log(null, { name: "", age: 0, isMarried: false });
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      deleteUser(id);
    }
  };

  return (
    <div>
      <br />
      <table className="min-w-[100vw] border-gray-900">
        <thead>
          <th className="border">Name</th>
          <th className="border">Age</th>
          <th className="border">Married</th>
          <th className="border">Profile Link</th>
          <th className="border">Page Button</th>
          <th className="border" colSpan={2}>
            Action
          </th>
        </thead>
        <tbody>
          {users?.map(({ name, age, isMarried }) => (
            <tr>
              <td className="text-center border py-4">
                {editingUser === name ? (
                  <input
                    type="text"
                    name="name"
                    value={formDataToEdit.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  name
                )}
              </td>
              <td className="text-center border py-4">
                {editingUser === name ? (
                  <input
                    type="number"
                    name="age"
                    value={formDataToEdit.age}
                    onChange={handleInputChange}
                  />
                ) : (
                  age
                )}
              </td>
              <td className="text-center border py-4">
                {editingUser === name ? (
                  <select
                    name="isMarried"
                    value={formDataToEdit.isMarried.toString()}
                    onChange={handleInputChange}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                ) : isMarried ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>
              <td className="text-center text-blue-600 border py-4">
                <Link to={`/user`} state={{ age, name, isMarried }}>
                  {name}'s Profile
                </Link>
              </td>
              <td className="text-center border py-4">
                <button
                  className="button bg-blue-500 w-[50%] text-white px-3 py-1 rounded"
                  onClick={() => handleNavigate(name, age, isMarried)}
                >
                  User
                </button>
              </td>
              <td className="text-center border py-4">
                {editingUser === name ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-200 text-gray-800 px-2 py-1 rounded"
                    onClick={() => handleClickEdit(name, age, isMarried)}
                  >
                    Edit
                  </button>
                )}
              </td>
              <td className="text-center border py-4">
                {editingUser === name ? (
                  <button
                    className="button bg-red-400 w-[50%] text-white px-1 py-1 rounded"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="button bg-red-400 w-[50%] text-white px-1 py-1 rounded"
                    onClick={() => handleDelete(age)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayUsers;
