import { Link } from "react-router-dom";
import useUserHook from "../../hooks/useUserHook";
import AddUser from "./AddUser";

const DisplayUsersData = () => {
  const {
    users,
    editingUser,
    dataToUpdate,
    handleNavigate,
    handleEditClick,
    handleChange,
    handleSave,
    handleCancel,
    handleDelete,
  } = useUserHook();

  return (
    <div>
      <AddUser />
      <br />
      <br />
      <table className="w-full">
        <thead>
          <th className="py-3 border">Name</th>
          <th className="py-3 border">Age</th>
          <th className="py-3 border">Married</th>
          <th className="py-3 border">Profile Link</th>
          <th className="py-3 border">Page Link</th>
          <th className="py-3 border" colSpan={2}>
            Actions
          </th>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map(({ id, name, age, isMarried }) => (
              <tr
                key={id}
                className={`text-center transition ${
                  editingUser === id
                    ? "bg-yellow-100 shadow-md border-2 border-gray-500"
                    : ""
                }`}
              >
                <td className="py-3 border">
                  {editingUser === id ? (
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      onChange={handleChange}
                      value={dataToUpdate.name}
                      className="text-center outline-none w-full bg-transparent"
                    />
                  ) : (
                    name
                  )}
                </td>
                <td className="py-3 border">
                  {editingUser === id ? (
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      onChange={handleChange}
                      value={dataToUpdate.age}
                      className="text-center outline-none w-full bg-transparent"
                    />
                  ) : (
                    age
                  )}
                </td>
                <td className="py-3 border">
                  {editingUser === id ? (
                    <select
                      name="isMarried"
                      onChange={handleChange}
                      value={dataToUpdate.isMarried.toString()}
                      className="bg-transparent"
                    >
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </select>
                  ) : isMarried ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className="py-3 border text-blue-600">
                  <Link to={"/user"} state={{ id, name, age, isMarried }}>
                    {name}'s Profile
                  </Link>
                </td>
                <td className="py-3 border">
                  <button
                    onClick={() => handleNavigate({ id, name, age, isMarried })}
                    className="rounded bg-blue-600 text-white px-3 py-1"
                  >
                    {name}'s Page
                  </button>
                </td>
                <td className="py-3 border">
                  {editingUser === id ? (
                    <button
                      onClick={() => handleSave(dataToUpdate)}
                      className="rounded bg-green-500 text-white px-3 py-1"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleEditClick({ id, name, age, isMarried })
                      }
                      className="rounded bg-yellow-300 text-gray-800 px-3 py-1"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="py-3 border">
                  {editingUser === id ? (
                    <button
                      onClick={handleCancel}
                      className="rounded bg-red-400 text-white px-3 py-1"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDelete(id)}
                      className="rounded bg-red-400 text-white px-3 py-1"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayUsersData;
