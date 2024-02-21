import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import useAuth from "hooks/useAuth";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Patient } from "types/Patient";
import { useAddNewAppointmentMutation } from "./appointmentsApiSlice";
import { AppointmentFormValues } from "types/Appointment";
import DashSpinner from "components/Dashboard/DashSpinner";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentValidation } from "validations/appointmentValidation";
import { ErrorType } from "types/Error";

type NewAppointmentFormProps = {
  patients: Patient[];
};

const NewAppointmentForm: React.FC<NewAppointmentFormProps> = ({
  patients,
}) => {
  const { email } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const patientId = new URLSearchParams(useLocation().search).get("patientId");

  const [addNewAppointment, { isSuccess, isError, error }] =
    useAddNewAppointmentMutation();

  const form = useForm<AppointmentFormValues>({
    defaultValues: {
      date: undefined,
      patient: undefined,
      startTime: undefined,
      endTime: undefined,
      remarks: "",
    },
    resolver: yupResolver(
      appointmentValidation
    ) as Resolver<AppointmentFormValues>,
  });

  const { register, control, handleSubmit, formState, reset, watch } = form;
  const { errors, isSubmitting, dirtyFields } = formState;
  const patientValue = watch("patient");

  const onSubmit = async (data: AppointmentFormValues) => {
    const { date, patient, startTime, endTime, remarks } = data;

    try {
      await addNewAppointment({
        date,
        patient: patient.value,
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
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate(-1);
      toast({
        title: "Success",
        description: "New appointment added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  if (!patients) return <DashSpinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Card
        w={{
          base: "300px",
          sm: "400px",
        }}
      >
        <CardHeader as={Flex} justify={"center"}>
          {" "}
          <Heading size={"md"}>New Appointment</Heading>
        </CardHeader>

        <CardBody as={Stack} spacing={"10px"}>
          {" "}
          F
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
                      field.value ? new Date(Number(field.value) * 1000) : null
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
          <FormControl isDisabled={patientId ? true : false}>
            <FormLabel>Patient</FormLabel>
            <Controller
              name="patient"
              control={control}
              render={({ field }) => (
                <Select
                  options={
                    patients.map((patient) => ({
                      value: patient.id,
                      label: `${patient.fname} ${patient.mname} ${patient.lname}`,
                    })) as any
                  }
                  isSearchable
                  isClearable
                  placeholder="Select Patient"
                  {...field}
                  value={
                    patientId
                      ? {
                          value: patientId,
                          //include patient fname, mname, lname
                          label: patients.find(
                            (patient) => patient.id === patientId
                          )?.fname
                            ? `${
                                patients.find(
                                  (patient) => patient.id === patientId
                                )?.fname
                              } ${
                                patients.find(
                                  (patient) => patient.id === patientId
                                )?.mname
                              } ${
                                patients.find(
                                  (patient) => patient.id === patientId
                                )?.lname
                              }`
                            : "Select Patient",
                        }
                      : field.value
                  }
                  isDisabled={patientId ? true : false}
                />
              )}
            />
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
                      field.value ? new Date(Number(field.value) * 1000) : null
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
                      field.value ? new Date(Number(field.value) * 1000) : null
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
            isDisabled={!dirtyFields.date || !patientValue}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default NewAppointmentForm;
