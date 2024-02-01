import {
  Card,
  CardBody,
  Divider,
  Flex,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Appointment } from "types/Appointment";
import { useGetAppointmentsQuery } from "./appointmentsApiSlice";
import { EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import DeleteAppointment from "./DeleteAppointment";

type AppointmentCardProps = {
  appointmentId: string;
  patientId?: string;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointmentId,
  patientId,
}) => {
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
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}>Patient Name:</Text>
            <Text>{appointment.patientName}</Text>
          </Flex>
          <Divider />
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}>Date:</Text>
            <Text>
              {" "}
              {new Date(appointment.date * 1000)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </Text>
          </Flex>

          {appointment.startTime && appointment.endTime ? (
            <>
              <Divider />
              <Flex justify={"space-between"}>
                <Text color={"gray.500"}>Time: </Text>
                <Text>
                  {new Date(appointment.startTime * 1000)
                    .toTimeString()
                    .split(" ")[0]
                    .split(":")
                    .slice(0, 2)
                    .join(":")}{" "}
                  -{" "}
                  {new Date(appointment.endTime * 1000)
                    .toTimeString()
                    .split(" ")[0]
                    .split(":")
                    .slice(0, 2)
                    .join(":")}
                </Text>
              </Flex>
            </>
          ) : null}

          {appointment.remarks && (
            <>
              <Divider />
              <Flex direction={"column"}>
                <Text color={"gray.500"}>Remarks:</Text>
                <Text>{appointment.remarks}</Text>
              </Flex>
            </>
          )}
          <Divider />
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}> Created By</Text>
            <Text color={"gray.500"}>{appointment.createdBy}</Text>
          </Flex>
          <Divider />
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}>Creation Date:</Text>
            <Text color={"gray.500"}>
              {new Date(appointment.createdAt).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </Flex>
          {appointment.updatedBy && (
            <>
              <Divider />
              <Flex justify={"space-between"}>
                <Text color={"gray.500"}> Updated By</Text>
                <Text color={"gray.500"}>{appointment.updatedBy}</Text>
              </Flex>
              <Divider />
              <Flex justify={"space-between"}>
                <Text color={"gray.500"}>Last Updated:</Text>
                <Text color={"gray.500"}>
                  {new Date(appointment.updatedAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </Flex>
            </>
          )}
        </CardBody>
        <Flex borderTop={"1px solid"} borderColor={"gray.100"}>
          <IconButton
            variant={"ghost"}
            as={Flex}
            w={"full"}
            onClick={() =>
              navigate(
                patientId
                  ? `/dash/appointments/${appointmentId}?patientId=${patientId}`
                  : `/dash/appointments/${appointmentId}`
              )
            }
            aria-label="edit appointment"
            icon={<Icon as={EditIcon} />}
          />
          <Divider orientation="vertical" h={"inherit"} />
          <DeleteAppointment appointment={appointment} />
        </Flex>
      </Card>
    );
  }
};
export default AppointmentCard;
