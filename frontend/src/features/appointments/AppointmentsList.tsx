import DashSpinner from "components/Dashboard/DashSpinner";
import { useGetAppointmentsQuery } from "./appointmentsApiSlice";
import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import { ErrorType } from "types/ErrorType";
import AppointmentCard from "./AppointmentCard";
import { useParams } from "react-router-dom";

const AppointmentsList = () => {
  const { id: patientId } = useParams<{ id: string }>();
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
    const { ids, entities } = appointments;

    if (patientId) {
      if (
        !ids?.filter(
          (appointmentId) => entities[appointmentId]?.patient === patientId
        ).length
      ) {
        return <Alert status="info">No appointments found</Alert>;
      }
      return (
        <Stack>
          {ids.length &&
            ids
              ?.filter(
                (appointmentId) =>
                  entities[appointmentId]?.patient === patientId
              )
              .map((appointmentId) => (
                <AppointmentCard
                  key={appointmentId}
                  appointmentId={String(appointmentId)}
                  patientId={patientId}
                />
              ))}
        </Stack>
      );
    } else {
      return (
        <Stack>
          {ids?.map((appointmentId) => (
            <AppointmentCard
              key={appointmentId}
              appointmentId={String(appointmentId)}
            />
          ))}
        </Stack>
      );
    }
  }
};
export default AppointmentsList;
