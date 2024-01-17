import DashSpinner from "components/Dashboard/DashSpinner";
import { useGetProceduresQuery } from "./proceduresApiSlice";
import {
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ErrorType } from "types/ErrorType";
import ProcedureRow from "./ProcedureRow";

const ProceduresList = () => {
  const {
    data: procedures,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProceduresQuery("procedureslist", {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  if (isLoading) return <DashSpinner />;

  if (isError)
    return (
      <Alert status="error">
        <AlertIcon />
        {(error as ErrorType)?.data?.message}
      </Alert>
    );

  if (isSuccess) {
    return (
      <Card>
        <CardBody>
          <Table size={"sm"}>
            <Thead>
              <Tr>
                <Th>Procedure Name</Th>
                <Th>Amount</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {procedures?.ids?.map((procedureId) => (
                <ProcedureRow
                  key={procedureId}
                  procedureId={String(procedureId)}
                />
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }

  if (!procedures) {
    return <div>no procedures</div>;
  }
};
export default ProceduresList;
