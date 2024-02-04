import { EditIcon } from "@chakra-ui/icons";
import { Icon, IconButton, Td, Tr } from "@chakra-ui/react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "types/User";
import { useGetUsersQuery } from "./usersApiSlice";

type UserRowProps = {
  userId: string;
};

const UserRow = ({ userId }: UserRowProps) => {
  const navigate = useNavigate();
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId as string] as User,
    }),
  });

  if (user) {
    const userRolesString = user.roles.toString().replace(/,/g, ", ");

    return (
      <Tr>
        <Td>
          {user.fname} {user.lname}
        </Td>
        <Td>{userRolesString}</Td>
        <Td>
          <IconButton
            aria-label="view"
            onClick={() => navigate(`/dash/users/${userId}`)}
            icon={<Icon as={EditIcon} />}
          />
        </Td>
      </Tr>
    );
  } else return null;
};
const UserRowMemo = memo(UserRow);
export default UserRowMemo;
