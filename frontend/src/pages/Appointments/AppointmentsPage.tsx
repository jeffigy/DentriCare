import { Box, Flex } from "@chakra-ui/react";
import FloatingButton from "components/FloatingButton";
import AppointmentsList from "features/appointments/AppointmentsList";
import useTitle from "hooks/useTitle";
import { MdPlaylistAdd } from "react-icons/md";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Appointment } from "types/Appointment";
import { differenceInCalendarDays } from "date-fns";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const AppointmentsPage = () => {
  useTitle("Appointments");
  const [value, onChange] = useState<Value>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>();

  function isSameDay(a: number | Date, b: number | Date) {
    return differenceInCalendarDays(a, b) === 0;
  }

  function tileClassName({ date, view }: { date: Date; view: string }) {
    const appointmentsArray = Object.values(appointments || {});

    if (
      view === "month" &&
      appointmentsArray.find((appointment: any) =>
        isSameDay(new Date(appointment.date * 1000), date)
      )
    ) {
      return "highlight";
    }
  }

  return (
    <Flex w="full" justify={"center"}>
      <Box>
        {" "}
        <Calendar
          onChange={onChange}
          value={value}
          calendarType="gregory"
          tileClassName={tileClassName}
        />
      </Box>

      <Box w={"400px"}>
        <AppointmentsList
          filterDate={
            value instanceof Date
              ? Math.floor(value.getTime() / 1000)
              : undefined
          }
          setter={setAppointments as (data: Appointment[]) => void}
        />
      </Box>
      <FloatingButton
        icon={MdPlaylistAdd}
        ariaLabel={"new appointment"}
        to={`/dash/appointments/new`}
      />
    </Flex>
  );
};
export default AppointmentsPage;
