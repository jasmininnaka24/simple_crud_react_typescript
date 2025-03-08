import useUserHook from "../../hooks/useUserHook";

const AddUser = () => {
  const { dataToAdd, handleChangeForAddingData, handleAddUser } = useUserHook();

  return (
    <div>
      <form onSubmit={(e) => handleAddUser(e, dataToAdd)}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={dataToAdd.name}
          onChange={handleChangeForAddingData}
        />
        <input
          type="number"
          name="age"
          placeholder="NameAge"
          value={dataToAdd.age}
          onChange={handleChangeForAddingData}
        />
        <select
          name="isMarried"
          value={dataToAdd.isMarried.toString()}
          onChange={handleChangeForAddingData}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
