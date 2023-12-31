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
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "style.css";
import { ErrorType } from "types/ErrorType";
import { Patient } from "types/Patient";
import { PatientFormValues } from "types/PatientFormValues";
import { newPatientValidation } from "validations/patientValidation";
import DeletePatient from "./DeletePatient";
import { useUpdatePatientMutation } from "./patientsApiSlice";

type EditPatientFormProps = {
  patient: Patient;
};

const EditPatientForm: React.FC<EditPatientFormProps> = ({ patient }) => {
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
      createdBy: patient.createdBy.toString(),
    },
    resolver: yupResolver(newPatientValidation) as Resolver<PatientFormValues>,
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async (data: PatientFormValues) => {
    const { fname, mname, lname, bday, address, phone, createdBy } = data;
    try {
      await updatePatient({
        id: patient.id,
        fname,
        mname,
        lname,
        bday,
        address,
        phone,
        createdBy,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `${
          (error as ErrorType)?.data?.message ?? "An error occurred"
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (isError && !toast.isActive("errorToast")) {
      toast({
        id: "errorToast",
        title: "Error",
        description: (error as ErrorType)?.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (isSuccess && !toast.isActive("successToast")) {
      toast({
        id: "successToast",
        title: "Success",
        description: "Patient updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      navigate("/dash/patients");
    }
  }, [isError, isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <Card
          w={{
            base: "300px",
            md: "400px",
          }}
        >
          <CardHeader as={Flex} justify={"center"}>
            <Heading size={"md"}>Edit Patient</Heading>
          </CardHeader>
          <CardBody as={Stack} spacing={"10px"}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                autoComplete={"false"}
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
                autoComplete={"false"}
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
                autoComplete={"false"}
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
                      customInput={<Input isInvalid={!!errors.bday} />}
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
                  autoComplete={"false"}
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
                  autoComplete={"false"}
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
            <FormControl>
              <FormLabel>Created By</FormLabel>
              <Input
                autoComplete={"false"}
                id="createdBy"
                type="text"
                {...register("createdBy")}
                isInvalid={!!errors.createdBy}
              />
              {errors.createdBy && (
                <FormHelperText color={"red"}>
                  {errors.createdBy.message}
                </FormHelperText>
              )}
            </FormControl>
          </CardBody>
          <CardFooter as={Stack}>
            <Button
              w={"full"}
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty || isSubmitting}
            >
              Save
            </Button>
            <DeletePatient
              patient={{
                id: patient.id,
                fname: patient.fname,
                mname: patient.mname,
                lname: patient.lname,
              }}
            />
          </CardFooter>
        </Card>
      </form>
      <DevTool control={control} />
    </>
  );
};
export default EditPatientForm;
