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
import useAuth from "hooks/useAuth";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Patient } from "types/Patient";
import { useAddNewAppointmentMutation } from "./appointmentsApiSlice";
import { AppointmentFormValues } from "types/AppointmentFormValues";
import { DevTool } from "@hookform/devtools";
import DashSpinner from "components/Dashboard/DashSpinner";

import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentValidation } from "validations/appointmentValidation";
import { ErrorType } from "types/ErrorType";

type NewAppointmentFormProps = {
  patients: Patient[];
};

const NewAppointmentForm: React.FC<NewAppointmentFormProps> = ({
  patients,
}) => {
  const { email } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [addNewAppointment, { isSuccess, isError, error }] =
    useAddNewAppointmentMutation();

  const form = useForm<AppointmentFormValues>({
    defaultValues: {
      date: undefined,
      patient: "",
      startTime: undefined,
      endTime: undefined,
      remarks: "",
    },
    resolver: yupResolver(
      appointmentValidation
    ) as Resolver<AppointmentFormValues>,
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, dirtyFields } = formState;

  const onSubmit = async (data: AppointmentFormValues) => {
    const { date, patient, startTime, endTime, remarks } = data;

    try {
      await addNewAppointment({
        date,
        patient,
        startTime,
        endTime,
        remarks,
        createdBy: email,
      });
    } catch (err) {
      console.log("error: ", err);
    }
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "An error occurred.",
        description: `${(error as ErrorType)?.data?.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate("/dash/appointments");
      toast({
        title: "Success",
        description: "New appointment added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  if (!patients) return <DashSpinner />;

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
              isDisabled={!dirtyFields.date || !dirtyFields.patient}
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
export default NewAppointmentForm;
