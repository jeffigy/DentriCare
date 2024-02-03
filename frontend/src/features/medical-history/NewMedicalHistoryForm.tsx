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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import useAuth from "hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useAddNewMedicalHistoryMutation } from "./medicalHistoryApiSlice";
import { Resolver, useForm } from "react-hook-form";
import { MedicalHistoryFormValues } from "types/MedicalHistory";
import { yupResolver } from "@hookform/resolvers/yup";
import { medicalHistoryValidation } from "validations/medicalHistoryValidation";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { ErrorType } from "types/ErrorType";

const NewMedicalHistoryForm = () => {
  const { id } = useParams<{ id: string }>();
  const { email } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [addNewMedicalHistory, { isSuccess, isError, error }] =
    useAddNewMedicalHistoryMutation();

  const form = useForm<MedicalHistoryFormValues>({
    defaultValues: {
      message: "",
    },
    resolver: yupResolver(
      medicalHistoryValidation
    ) as Resolver<MedicalHistoryFormValues>,
  });

  const { register, control, handleSubmit, formState, reset } = form;

  const { errors, isSubmitting, isDirty } = formState;

  const onSubmit = async (data: MedicalHistoryFormValues) => {
    const { message } = data;

    try {
      await addNewMedicalHistory({
        patient: id,
        message,
        createdBy: email,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "New medical history added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          w={{
            base: "300px",
            md: "400px",
          }}
        >
          <CardHeader as={Flex} justify={"center"}>
            <Heading size={"md"}>New Medical History</Heading>
          </CardHeader>
          <CardBody>
            <FormControl>
              <FormLabel>Message</FormLabel>
              <Textarea {...register("message")} />
              {errors.message && (
                <FormHelperText color={"red"}>
                  {errors.message.message}
                </FormHelperText>
              )}
            </FormControl>
          </CardBody>
          <CardFooter>
            <Button
              w="full"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty}
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
export default NewMedicalHistoryForm;
