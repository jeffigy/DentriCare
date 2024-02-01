import DashSpinner from "components/Dashboard/DashSpinner";
import {
  useGetAppointmentsByPatientIdQuery,
  useGetAppointmentsQuery,
} from "./appointmentsApiSlice";
import { Flex, Stack } from "@chakra-ui/react";
import { ErrorType } from "types/ErrorType";
import AppointmentCard from "./AppointmentCard";
import { useParams } from "react-router-dom";

const AppointmentsList = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: appointments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = id
    ? useGetAppointmentsByPatientIdQuery(id, {
        pollingInterval: 6000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
      })
    : useGetAppointmentsQuery("appointmentslist", {
        pollingInterval: 6000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
      });

  if (isLoading) return <DashSpinner />;

  if (isError) {
    return (
      <Flex justify={"center"}>{(error as ErrorType)?.data?.message}</Flex>
    );
  }

  if (isSuccess) {
    return (
      <Stack>
        {appointments?.ids?.map((appointmentId) => (
          <AppointmentCard
            key={appointmentId}
            appointmentId={String(appointmentId)}
            patientId={id ? String(id) : undefined}
          />
        ))}
      </Stack>
    );
  }
};

export default AppointmentsList;
