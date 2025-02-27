import { Link, useNavigate } from "react-router-dom";
import { useUserContextFunc } from "../context/UserContext";

const MainApp = () => {
  const navigate = useNavigate();
  const { users } = useUserContextFunc();

  const handleNavigate = (
    id: number,
    name: string,
    age: number,
    isMarried: boolean
  ) => {
    navigate("/user", { state: { id, name, age, isMarried } });
  };

  return (
    <div>
      {users?.map(({ id, age, name, isMarried }) => (
        <>
          <Link to={`/user`} state={{ id, age, name, isMarried }}>
            {name}
          </Link>

          <button onClick={() => handleNavigate(id, name, age, isMarried)}>
            User {id}
          </button>
          <br />
        </>
      ))}
    </div>
  );
};

export default MainApp;
