import { Flex } from "@chakra-ui/react";
import EditUserForm from "features/users/EditUserForm";
import { useGetUsersQuery } from "features/users/usersApiSlice";
import { useParams } from "react-router-dom";
import { User } from "types/User";
import useTitle from "hooks/useTitle";
import DashSpinner from "components/Dashboard/DashSpinner";

const EditUserPage = () => {
  useTitle("Edit User");

  const { id } = useParams<{ id: string }>();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id as string],
    }),
  });

  return (
    <Flex w={"full"} justify={"center"} h={"full"}>
      {user ? <EditUserForm user={user as User} /> : <DashSpinner />}
    </Flex>
  );
};
export default EditUserPage;
