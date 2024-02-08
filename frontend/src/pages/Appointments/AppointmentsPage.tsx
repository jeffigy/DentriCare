import { Card, Flex } from "@chakra-ui/react";
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
  const [value, onChange] = useState<Value>(null);
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
    <Flex
      w="full"
      direction={{
        base: "column",
        xl: "row",
      }}
      align={{ base: "center", xl: "flex-start" }}
      justify={{ base: "center" }}
    >
      {" "}
      <Card
        mr={{
          base: "0",
          xl: "4",
        }}
        mb={{
          base: "4",
          xl: "0",
        }}
      >
        <Calendar
          onChange={onChange}
          value={value}
          calendarType="gregory"
          tileClassName={tileClassName}
        />
      </Card>
      <AppointmentsList
        filterDate={value as Date | undefined}
        setter={setAppointments as (data: Appointment[]) => void}
      />
      <FloatingButton
        icon={MdPlaylistAdd}
        ariaLabel={"new appointment"}
        to={`/dash/appointments/new`}
      />
    </Flex>
  );
};
export default AppointmentsPage;
