import { useGetPatientsQuery } from "./patientsApiSlice";
import PatientRow from "./PatientRow";
import {
  Card,
  CardBody,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import { useEffect } from "react";
import { ErrorType } from "types/ErrorType";

const PatientsList = () => {
  const toast = useToast();

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

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: (error as ErrorType)?.data?.message,
        status: "error",
        duration: 6000,
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
