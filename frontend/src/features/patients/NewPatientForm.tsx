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
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PatientFormValues } from "types/Patient";
import { newPatientValidation } from "validations/patientValidation";
import { useAddNewPatientMutation } from "./patientsApiSlice";
import { ErrorType } from "types/ErrorType";

const NewPatientForm = () => {
  const toast = useToast();
  const [addNewPatient, { isSuccess, isError, error }] =
    useAddNewPatientMutation();
  const navigate = useNavigate();
  const { email } = useAuth();

  const form = useForm<PatientFormValues>({
    defaultValues: {
      fname: "",
      mname: "",
      lname: "",
      bday: undefined,
      address: "",
      phone: "",
    },
    resolver: yupResolver(newPatientValidation) as Resolver<PatientFormValues>,
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async (data: PatientFormValues) => {
    const { fname, mname, lname, bday, address, phone } = data;
    try {
      await addNewPatient({
        fname,
        mname,
        lname,
        bday,
        address,
        phone,
        createdBy: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    if (isSuccess) {
      reset();
      navigate(-1);
      toast({
        title: "Success",
        description: "Patient added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess, reset, navigate, toast, isError, error]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {" "}
        <Card
          w={{
            base: "300px",
            md: "400px",
          }}
        >
          <CardHeader as={Flex} justify={"center"}>
            <Heading size={"md"}>New Patient</Heading>
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
                id="mname"
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
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
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
      <DevTool control={control} />
    </>
  );
};
export default NewPatientForm;
