import DashSpinner from "components/Dashboard/DashSpinner";
import { useGetAppointmentsQuery } from "./appointmentsApiSlice";
import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import { ErrorType } from "types/ErrorType";
import AppointmentCard from "./AppointmentCard";

const AppointmentsList = () => {
  const {
    data: appointments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAppointmentsQuery("appointmentslist", {
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
      <Stack>
        {appointments?.ids?.map((appointmentId) => (
          <AppointmentCard
            key={appointmentId}
            appointmentId={String(appointmentId)}
          />
        ))}
      </Stack>
    );
  }
};
export default AppointmentsList;
