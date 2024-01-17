import { useGetPatientsQuery } from "./patientsApiSlice";
import PatientRow from "./PatientRow";
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
import DashSpinner from "components/Dashboard/DashSpinner";
import { ErrorType } from "types/ErrorType";

const PatientsList = () => {
  const {
    data: patients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPatientsQuery("patientslist", {
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
          {" "}
          <Table size={"sm"}>
            <Thead>
              <Tr>
                <Th>Patient Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients?.ids?.map((patientId) => (
                <PatientRow key={patientId} patientId={String(patientId)} />
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
};
export default PatientsList;
