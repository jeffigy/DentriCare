import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appointment } from "types/Appointment";
import { useUpdateAppointmentMutation } from "./appointmentsApiSlice";
import { Controller, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppointmentFormValues } from "types/AppointmentFormValues";
import { Patient } from "types/Patient";
import { appointmentValidation } from "validations/appointmentValidation";
import { DevTool } from "@hookform/devtools";
import DatePicker from "react-datepicker";
import useAuth from "hooks/useAuth";
import { ErrorType } from "types/ErrorType";

type EditAppointmentFormProps = {
  appointment: Appointment;
  patients: Patient[];
};

const EditAppointmentForm: React.FC<EditAppointmentFormProps> = ({
  appointment,
  patients,
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { email } = useAuth();

  const [updateAppointment, { isSuccess, isError, error }] =
    useUpdateAppointmentMutation();

  const form = useForm<AppointmentFormValues>({
    defaultValues: {
      patient: appointment.patient,
      date: appointment.date,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      remarks: appointment.remarks,
    },
    resolver: yupResolver(
      appointmentValidation
    ) as Resolver<AppointmentFormValues>,
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, dirtyFields, isDirty } = formState;

  const onSubmit = async (data: AppointmentFormValues) => {
    const { patient, date, startTime, endTime, remarks } = data;
    try {
      await updateAppointment({
        id: appointment.id,
        patient,
        date,
        startTime,
        endTime,
        remarks,
        updatedBy: email,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: (error as ErrorType).data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate("/dash/appointments");
      toast({
        title: "Success",
        description: "Appointment updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          w={{
            base: "300px",
            md: "400px",
          }}
        >
          <CardHeader>
            {" "}
            <Heading size={"md"}>New Appointment</Heading>
          </CardHeader>

          <CardBody as={Stack} spacing={"10px"}>
            {" "}
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <div className="customDatePickerWidth">
                    <DatePicker
                      minDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      customInput={<Input isInvalid={!!errors.date} />}
                      selected={
                        field.value
                          ? new Date(Number(field.value) * 1000)
                          : null
                      }
                      onChange={(date) =>
                        field.onChange(date ? date.getTime() / 1000 : 0)
                      }
                    />
                  </div>
                )}
              />
              {errors.date && (
                <FormHelperText color={"red"}>
                  {errors.date.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Patient</FormLabel>
              <Select placeholder="Select Patient" {...register("patient")}>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.fname} {patient.mname} {patient.lname}
                  </option>
                ))}
              </Select>
              {errors.patient && (
                <FormHelperText color={"red"}>
                  {errors.patient.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <div className="customDatePickerWidth">
                    <DatePicker
                      selected={
                        field.value
                          ? new Date(Number(field.value) * 1000)
                          : null
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      customInput={<Input isInvalid={!!errors.startTime} />}
                      onChange={(date) =>
                        field.onChange(date ? date.getTime() / 1000 : 0)
                      }
                    />
                  </div>
                )}
              />
              {errors.startTime && (
                <FormHelperText color={"red"}>
                  {errors.startTime.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <div className="customDatePickerWidth">
                    <DatePicker
                      selected={
                        field.value
                          ? new Date(Number(field.value) * 1000)
                          : null
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      customInput={<Input isInvalid={!!errors.endTime} />}
                      onChange={(date) =>
                        field.onChange(date ? date.getTime() / 1000 : 0)
                      }
                    />
                  </div>
                )}
              />
              {errors.endTime && (
                <FormHelperText color={"red"}>
                  {errors.endTime.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Remarks</FormLabel>
              <Textarea {...register("remarks")} />
            </FormControl>
          </CardBody>
          <CardFooter>
            <Button
              w={"full"}
              type="submit"
              isDisabled={!isDirty || Object.keys(dirtyFields).length === 0}
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
      <DevTool control={control} />
    </>
  );
};
export default EditAppointmentForm;