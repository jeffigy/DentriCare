import { Flex, Icon, IconButton } from "@chakra-ui/react";
import UsersList from "features/users/UsersList";
import { Link } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";

const UsersPage = () => {
  return (
    <Flex justify={"center"} align={"center"}>
      <IconButton
        as={Link}
        size={"lg"}
        isRound={true}
        aria-label="new-user"
        icon={<Icon as={GrUserAdmin} />}
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
