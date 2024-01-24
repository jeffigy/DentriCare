import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Appointment } from "types/Appointment";
import { useGetAppointmentsQuery } from "./appointmentsApiSlice";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import DeleteAppointment from "./DeleteAppointment";

type AppointmentCardProps = {
  appointmentId: string;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointmentId }) => {
  const navigate = useNavigate();
  const { appointment } = useGetAppointmentsQuery("appointmentsList", {
    selectFromResult: ({ data }) => ({
      appointment: data?.entities[appointmentId as string] as Appointment,
    }),
  });

  if (appointment) {
    return (
      <Card
        w={{
          base: "300px",
          md: "400px",
        }}
      >
        <CardBody>
          <Text>{appointment.patientName}</Text>
          <Text>{new Date(appointment.date * 1000).toDateString()}</Text>

          {appointment.startTime && appointment.endTime ? (
            <Text>
              From:{" "}
              {new Date(appointment.startTime * 1000)
                .toTimeString()
                .split(" ")[0]
                .split(":")
                .slice(0, 2)
                .join(":")}{" "}
              - To:{" "}
              {new Date(appointment.endTime * 1000)
                .toTimeString()
                .split(" ")[0]
                .split(":")
                .slice(0, 2)
                .join(":")}
            </Text>
          ) : null}

          <Text>Remarks: {appointment.remarks}</Text>
        </CardBody>
        <CardFooter as={Flex} justify={"space-between"}>
          <IconButton
            onClick={() => navigate(`/dash/appointments/${appointmentId}`)}
            aria-label="edit appointment"
            icon={<Icon as={EditIcon} />}
          />
          <DeleteAppointment appointment={appointment} />
        </CardFooter>
      </Card>
    );
  }
};
export default AppointmentCard;
