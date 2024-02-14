import { Flex, Stack } from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import { useParams } from "react-router-dom";
import { ErrorType } from "types/Error";
import AppointmentCard from "./AppointmentCard";
import {
  useGetAppointmentsByPatientIdQuery,
  useGetAppointmentsQuery,
} from "./appointmentsApiSlice";
import { useEffect } from "react";

type AppointmentsListProps = {
  filterDate?: Date;
  setter?: (data: any) => void;
};

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  filterDate,
  setter,
}) => {
  const { id } = useParams<{ id: string }>();
  const selectedDate = filterDate ? filterDate.getTime() / 1000 : undefined;

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

  useEffect(() => {
    if (setter) {
      setter(appointments?.entities);
    }
  }, [setter, appointments]);

  if (isLoading)
    return (
      <Flex w={{ base: "300px", md: "400px" }}>
        <DashSpinner />
      </Flex>
    );

  if (isError) {
    return <Flex justify={"center"}>{(error as ErrorType).data.message}</Flex>;
  }

  if (isSuccess) {
    const { ids, entities } = appointments;

    const filteredAppointments = ids.filter((appointmentId) => {
      const appointment = entities[appointmentId];
      return appointment?.date === selectedDate;
    });

    const appointmentsToDisplay = selectedDate ? filteredAppointments : ids;

    if (appointmentsToDisplay.length === 0) {
      return (
        <Flex justify={"center"} w={{ base: "300px", md: "400px" }}>
          No appointments found
        </Flex>
      );
    }

    return (
      <Stack>
        {appointmentsToDisplay.map((appointmentId) => (
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
