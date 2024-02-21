import { useState } from "react";
import Calendar from "react-calendar";
import { Appointment } from "types/Appointment";
import { differenceInCalendarDays } from "date-fns";
import { Card, Flex } from "@chakra-ui/react";
import AppointmentsList from "features/appointments/AppointmentsList";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const AppointmentsCalendar = () => {
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
      direction={"column"}
      height={"calc(100vh - 152px)"}
      position={"relative"}
      overflow={"hidden"}
    >
      <div
        className="custom-scrollbar"
        style={{
          overflowY: "scroll",
          alignItems: "center",
          height: "calc(100vh - 152px)",
        }}
      >
        <Card
          position={{
            base: "initial",
            lg: "fixed",
          }}
          zIndex={2}
          mb={"4"}
          boxSize={{
            base: "300px",
            sm: "400px",
          }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Calendar
            onChange={onChange}
            value={value}
            calendarType="gregory"
            tileClassName={tileClassName}
          />
        </Card>
        <Flex
          w={{
            base: "300x",
            sm: "400px",
          }}
          mt={{
            base: "0",
            lg: "420px",
          }}
        >
          <AppointmentsList
            filterDate={value as Date | undefined}
            setter={setAppointments as (data: Appointment[]) => void}
          />
        </Flex>
      </div>
    </Flex>
  );
};
export default AppointmentsCalendar;
