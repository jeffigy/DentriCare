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
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PatientFormValues } from "types/PatientFormValues";
import { newPatientValidation } from "validations/patientValidation";
import { useAddNewPatientMutation } from "./patientsApiSlice";

const NewPatientForm = () => {
  const toast = useToast();
  const [addNewPatient, { isSuccess, isError, error }] =
    useAddNewPatientMutation();
  const navigate = useNavigate();

  const form = useForm<PatientFormValues>({
    defaultValues: {
      fname: "",
      mname: "",
      lname: "",
      bday: undefined,
      address: "",
      phone: undefined,
      createdBy: "",
    },
    resolver: yupResolver(newPatientValidation) as Resolver<PatientFormValues>,
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting } = formState;

  console.log(errors);
  const onSubmit = async (data: PatientFormValues) => {
    const { fname, mname, lname, bday, address, phone, createdBy } = data;
    if (Object.keys(errors).length === 0) {
      await addNewPatient({
        fname,
        mname,
        lname,
        bday,
        address,
        phone,
        createdBy,
      });
    }
    if (isError) {
      //TODO: fix the error message because it showing the whole error object
      toast({
        title: "Error",
        description: `${error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!isSubmitting && isSuccess) {
      reset();
      navigate("/dash/patients");
      toast({
        title: "Success",
        description: "Patient added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isSuccess, isSubmitting, reset, navigate, toast]);
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
                  <DatePicker
                    calendarClassName="red-border"
                    customInput={<Input />}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.getTime() / 1000 : 0)
                    }
                  />
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
