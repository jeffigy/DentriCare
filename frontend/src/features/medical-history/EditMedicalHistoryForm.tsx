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
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MedicalHistory, MedicalHistoryFormValues } from "types/MedicalHistory";
import { useUpdateMedicalHistoryMutation } from "./medicalHistoryApiSlice";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { medicalHistoryValidation } from "validations/medicalHistoryValidation";
import { ErrorType } from "types/ErrorType";
import { DevTool } from "@hookform/devtools";

type EditMedicalHistoryFormProps = {
  medicalHistory: MedicalHistory;
};

const EditMedicalHistoryForm: React.FC<EditMedicalHistoryFormProps> = ({
  medicalHistory,
}) => {
  const { email } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [updateMedicalHistory, { isSuccess, isError, error }] =
    useUpdateMedicalHistoryMutation();

  const form = useForm<MedicalHistoryFormValues>({
    defaultValues: {
      message: medicalHistory.message,
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
      await updateMedicalHistory({
        id: medicalHistory.id,
        message,
        updatedBy: email,
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
            <Heading size={"md"}>Update Medical History</Heading>
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
export default EditMedicalHistoryForm;
