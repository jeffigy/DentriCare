import { Flex, Icon, IconButton } from "@chakra-ui/react";
import UsersList from "features/users/UsersList";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const UsersPage = () => {
  return (
    <Flex justify={"center"} align={"center"}>
      <IconButton
        as={Link}
        size={"lg"}
        isRound={true}
        aria-label="new-user"
        icon={<Icon as={FiUserPlus} />}
        sx={{
          position: "fixed",
          right: "16px",
          bottom: "16px",
        }}
        to={"/dash/users/new"}
      />
      <UsersList />
    </Flex>
  );
};
export default UsersPage;
