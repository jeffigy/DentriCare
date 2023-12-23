import { Flex, Spinner } from "@chakra-ui/react";
import EditUserForm from "features/users/EditUserForm";
import { useAppSelector } from "app/hooks";
import { User, selectUserById } from "features/users/usersApiSlice";
import { useParams } from "react-router-dom";

const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => selectUserById(state, id || ""));
  return (
    <Flex w={"full"} justify={"center"} h={"full"}>
      {user ? (
        <EditUserForm user={user as User} />
      ) : (
        <Flex align={"center"}>
          <Spinner />
        </Flex>
      )}
    </Flex>
  );
};
export default EditUserPage;
