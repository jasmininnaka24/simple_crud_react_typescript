import { useLocation } from "react-router-dom";
import { UserDataType } from "../../context/UserContext";
const DisplayUserData = () => {
  const location = useLocation();
  const { id, name, age, isMarried } = location.state as UserDataType;
  return (
    <div>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Married: {isMarried ? "Yes" : "No"}</p>
    </div>
  );
};

export default DisplayUserData;
