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
  InputGroup,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "hooks/useAuth";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/Error";
import { Patient, PatientFormValues } from "types/Patient";
import { newPatientValidation } from "validations/patientValidation";
import { useUpdatePatientMutation } from "./patientsApiSlice";
type EditPatientFormProps = {
  patient: Patient;
};

const EditPatientForm: React.FC<EditPatientFormProps> = ({ patient }) => {
  const { email } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [updatePatient, { isSuccess, isError, error }] =
    useUpdatePatientMutation();

  const form = useForm<PatientFormValues>({
    defaultValues: {
      fname: patient.fname,
      mname: patient.mname,
      lname: patient.lname,
      bday: patient.bday,
      address: patient.address,
      phone: patient.phone,
    },
    resolver: yupResolver(newPatientValidation) as Resolver<PatientFormValues>,
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async (data: PatientFormValues) => {
    const { fname, mname, lname, bday, address, phone } = data;
    try {
      await updatePatient({
        id: patient.id,
        fname,
        mname,
        lname,
        bday,
        address,
        phone,
        updatedBy: email,
      });
    } catch (error) {
      console.log("edit patient error", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast({
        title: "Success",
        description: "Patient updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(-1);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: (error as ErrorType).data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      {" "}
      <Card
        w={{
          base: "300px",
          sm: "400px",
        }}
      >
        <CardHeader as={Flex} justify={"center"}>
          <Heading size={"md"}>Edit Patient</Heading>
        </CardHeader>
        <CardBody as={Stack} spacing={"10px"}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              autoComplete="off"
              id="fname"
              type="text"
              {...register("fname")}
              isInvalid={!!errors.fname}
            />
            {errors.fname && (
              <FormHelperText color={"red"}>
                {errors.fname.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Middle Name</FormLabel>
            <Input
              autoComplete="off"
              id="fname"
              type="text"
              {...register("mname")}
              isInvalid={!!errors.mname}
            />
            {errors.mname && (
              <FormHelperText color={"red"}>
                {errors.mname.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              autoComplete="off"
              id="lname"
              type="text"
              {...register("lname")}
              isInvalid={!!errors.lname}
            />
            {errors.lname && (
              <FormHelperText color={"red"}>
                {errors.lname.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Birthday</FormLabel>
            <Controller
              name="bday"
              control={control}
              render={({ field }) => (
                <div className="customDatePickerWidth">
                  <DatePicker
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    customInput={<Input isInvalid={!!errors.bday} />}
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
            {errors.bday && (
              <FormHelperText color={"red"}>
                {errors.bday.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <InputGroup>
              <Input
                id="phone"
                type="text"
                {...register("phone")}
                isInvalid={!!errors.phone}
                autoComplete="off"
              />
            </InputGroup>
            {errors.phone && (
              <FormHelperText color={"red"}>
                {errors.phone.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <InputGroup>
              <Textarea
                autoComplete="off"
                id="address"
                {...register("address")}
                isInvalid={!!errors.address}
              />
            </InputGroup>
            {errors.address && (
              <FormHelperText color={"red"}>
                {errors.address.message}
              </FormHelperText>
            )}
          </FormControl>
        </CardBody>
        <CardFooter>
          <Button
            w={"full"}
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!isDirty || isSubmitting}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default EditPatientForm;
