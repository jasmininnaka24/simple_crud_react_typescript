import { useLocation } from "react-router-dom";
import { User } from "../../context/UserContext";

const DisplayUserData = () => {
  const location = useLocation();
  const { id, name, age, isMarried } = location.state as User;

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
