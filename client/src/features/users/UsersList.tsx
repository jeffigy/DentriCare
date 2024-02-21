import {
  Card,
  CardBody,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import { ErrorType } from "types/Error";
import UserRow from "./UserRow";
import { useGetUsersQuery } from "./usersApiSlice";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("userslist", {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isError)
    return <Flex justify={"center"}>{(error as ErrorType).data.message}</Flex>;

  if (isLoading) return <DashSpinner />;

  if (isSuccess) {
    return (
      <Card>
        <CardBody>
          {" "}
          <TableContainer>
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Roles</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.ids?.map((userId) => (
                  <UserRow key={userId} userId={String(userId)} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    );
  }
};
export default UsersList;
