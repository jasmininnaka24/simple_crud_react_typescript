import { Link } from "react-router-dom";
import useUserHook from "../../hooks/useUserHook";

const UserManagement = () => {
  const {
    users,
    editingUser,
    dataToUpdate,
    handleNavigate,
    handleClickEdit,
    handleChange,
    handleSave,
    handleDelete,
    handleCancel,
  } = useUserHook();

  return (
    <div>
      <table className="w-full">
        <thead>
          <th className="py-3 border">Name</th>
          <th className="py-3 border">Age</th>
          <th className="py-3 border">Married</th>
          <th className="py-3 border">Profile Link</th>
          <th className="py-3 border">Page Link</th>
          <th className="py-3 border" colSpan={2}>
            Action
          </th>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map(({ id, name, age, isMarried }) => (
              <tr
                key={id}
                className={`text-center transition ${
                  editingUser === id ? "bg-yellow-100 shadow-md" : ""
                }}`}
              >
                <td className="py-3 border">
                  {editingUser === id ? (
                    <input
                      className="text-center bg-transparent w-full outline-none"
                      onChange={handleChange}
                      type="text"
                      name="name"
                      value={dataToUpdate.name}
                    />
                  ) : (
                    name
                  )}
                </td>
                <td className="py-3 border">
                  {editingUser === id ? (
                    <input
                      className="text-center bg-transparent w-full outline-none"
                      onChange={handleChange}
                      type="number"
                      name="age"
                      value={dataToUpdate.age}
                    />
                  ) : (
                    age
                  )}
                </td>
                <td className="py-3 border">
                  {editingUser === id ? (
                    <select
                      name="isMarried"
                      className="text-center bg-transparent w-full outline-none"
                      onChange={handleChange}
                      value={dataToUpdate.isMarried.toString()}
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
                <td className="py-3 border">
                  <Link
                    className="text-blue-600"
                    to={"/user"}
                    state={{ id, name, age, isMarried }}
                  >
                    {name}'s Profile
                  </Link>
                </td>
                <td className="py-3 border">
                  <button
                    onClick={(e) => handleNavigate(e, id, name, age, isMarried)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    {name}'s Page
                  </button>
                </td>
                <td className="border">
                  {editingUser === id ? (
                    <button
                      onClick={() => handleSave(id ? id : 0, dataToUpdate)}
                      className="bg-green-500 text-white rounded w-20 py-1"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClickEdit(id, name, age, isMarried)}
                      className="bg-yellow-300 text-gray-800 rounded w-20 py-1"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="border">
                  {editingUser === id ? (
                    <button
                      onClick={handleCancel}
                      className="bg-red-400 text-white rounded w-20 py-1"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDelete(id ?? 0)}
                      className="bg-red-400 text-white rounded w-20 py-1"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Record Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
