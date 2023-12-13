import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import UserRow from "./UserRow";
type UsersListProps = {};

const UsersList: React.FC<UsersListProps> = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined); //! observe if the 'undefined' is a problem
  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p>{error.toString()}</p>;
  }

  if (isSuccess) {
    const { ids } = users;
    console.log("ids", ids);

    const tableContent = ids?.length
      ? ids.map((userId) => <UserRow key={userId} userId={String(userId)} />)
      : null;

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default UsersList;
