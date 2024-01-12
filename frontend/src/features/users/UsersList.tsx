import { useGetUsersQuery } from "./usersApiSlice";
import UserRow from "./UserRow";
import {
  Card,
  CardBody,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import DashSpinner from "components/Dashboard/DashSpinner";
import { ErrorType } from "types/ErrorType";

const UsersList = () => {
  const toast = useToast();

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("userslist", {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: (error as ErrorType)?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError]);

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
