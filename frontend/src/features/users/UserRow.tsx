import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import { User } from "types/User";
import { memo } from "react";

type UserRowProps = {
  userId: string;
};

const UserRow = ({ userId }: UserRowProps) => {
  console.log("userId", userId);
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId as string] as User,
    }),
  });
  console.log("user", user);

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replace(/,/g, ", "); //! observe if the change in replace() is a problem

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.fname}</td>
        <td className={`table__cell ${cellStatus}`}>{user.lname}</td>
        <td className={`table__cell ${cellStatus}`}>{user.email}</td>
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
const UserRowMemo = memo(UserRow);
export default UserRowMemo;
