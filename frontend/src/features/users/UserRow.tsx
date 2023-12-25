import { useNavigate } from "react-router-dom";

import { selectUserById } from "./usersApiSlice";
import { useAppSelector } from "app/hooks";
import { User } from "types/User";
type UserRowProps = {
  userId: string;
};

const UserRow = ({ userId }: UserRowProps) => {
  console.log("userId", userId);
  const user = useAppSelector((state) => selectUserById(state, userId)) as User;
  console.log("user", user);

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replace(/,/g, ", "); //! observe if the change in replace() is a problem

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.fname}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            edit
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default UserRow;
