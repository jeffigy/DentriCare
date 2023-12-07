import UsersList from "features/users/UsersList";
import React from "react";

type UsersPageProps = {};

const UsersPage: React.FC<UsersPageProps> = () => {
  return (
    <div>
      users page
      <br />
      <UsersList />
    </div>
  );
};
export default UsersPage;
