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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Patient } from "types/Patient";
import { PatientFormValues } from "types/PatientFormValues";
import { newPatientValidation } from "validations/patientValidation";
import {
  useDeletePatientMutation,
  useUpdatePatientMutation,
} from "./patientsApiSlice";

type EditPatientFormProps = {
  patient: Patient;
};
const EditPatientForm: React.FC<EditPatientFormProps> = ({ patient }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [updatePatient, { isSuccess, isError, error }] =
    useUpdatePatientMutation();
  const [
    deletePatient,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeletePatientMutation();
  const [delButtonState, setDelButtonState] = useState(false);

  const form = useForm<PatientFormValues>({
    defaultValues: {
      fname: patient.fname,
      mname: patient.mname,
      lname: patient.lname,
      bday: new Date(patient.bday * 1000),
      address: patient.address,
      phone: patient.phone,
      createdBy: patient.createdBy.toString(),
    },
    resolver: yupResolver(newPatientValidation) as Resolver<PatientFormValues>,
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async (data: PatientFormValues) => {
    console.log(data);
    const { fname, mname, lname, bday, address, phone, createdBy } = data;
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
    if (isError) {
      toast({
        title: "Error",
        description: error?.toString(),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  console.log(error);

  const onDelete = async () => {
    setDelButtonState(true);
    await deletePatient({ id: patient.id });
    setDelButtonState(false);
    if (isDelError) {
      toast({
        title: "Error",
        description: delError?.toString(),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    if (isDelSuccess) {
      toast({
        title: "Success",
        description: "Patient deleted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
  };

  useEffect(() => {
    console.log("isSuccess?: ", isSuccess);
    if ((!isSubmitting && isSuccess) || isDelSuccess) {
      reset();
      navigate("/dash/patients");
    }
  }, [isSubmitting, isSuccess, navigate, isDelSuccess]);

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
          <CardFooter as={Stack}>
            <Button
              w={"full"}
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty || isSubmitting}
            >
              Save
            </Button>
            <>
              <Button
                variant={"ghost"}
                w={"full"}
                colorScheme="red"
                onClick={onOpen}
              >
                Delete User
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Delete User</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>
                      {" "}
                      A you sure on deleting user{" "}
                      <Text
                        as={"span"}
                        color={"red"}
                        fontWeight={"bold"}
                        fontSize={"lg"}
                      >
                        {patient.fname} {patient.mname} {patient.lname}
                      </Text>
                      ? This action cannot be undone.
                    </Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      variant="ghost"
                      colorScheme="blackAlpha"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={onDelete}
                      isLoading={delButtonState}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          </CardFooter>
        </Card>
      </form>
      <DevTool control={control} />
    </>
  );
};
export default EditPatientForm;
