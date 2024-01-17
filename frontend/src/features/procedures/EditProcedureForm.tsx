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
  InputLeftAddon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Procedure } from "types/Procedure";
import { useUpdateProcedureMutation } from "./proceduresApiSlice";
import { useForm, Resolver } from "react-hook-form";
import { ProcedureFormValues } from "types/ProcedureFormValues";
import { editProcedureValidation } from "validations/procedureValidation";

import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorType } from "types/ErrorType";
import useAuth from "hooks/useAuth";
import DeleteProcedure from "./DeleteProcedure";

type EditProcedureFormProps = {
  procedure: Procedure;
};

const EditProcedureForm: React.FC<EditProcedureFormProps> = ({ procedure }) => {
  const { email } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [updateProcedure, { isSuccess, isError, error }] =
    useUpdateProcedureMutation();

  const form = useForm<ProcedureFormValues>({
    defaultValues: {
      name: procedure.name,
      amount: procedure.amount,
    },
    resolver: yupResolver(
      editProcedureValidation
    ) as Resolver<ProcedureFormValues>,
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async () => {
    const { name, amount } = form.getValues();
    try {
      await updateProcedure({
        id: procedure.id,
        name,
        amount,
        updatedBy: email,
      });
    } catch (err) {
      console.log("err: ", err);
      toast({
        title: "An error occurred.",
        description: `${err}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
      toast({
        title: "Success",
        description: "Procedure updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dash/procedures");
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        w={{
          base: "300px",
          md: "400px",
        }}
      >
        <CardHeader as={Flex} justify={"center"}>
          <Heading size={"md"}>Edit Procedure</Heading>
        </CardHeader>
        <CardBody as={Stack} spacing={"10px"}>
          <FormControl>
            <FormLabel>Procedure Name</FormLabel>
            <Input
              {...register("name")}
              autoComplete="false"
              id="name"
              type="text"
              isInvalid={!!errors.name}
            />
            {errors.name && (
              <FormHelperText color={"red"}>
                {errors.name.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Amount</FormLabel>

            <InputGroup>
              <InputLeftAddon children="₱" />
              <Input
                {...register("amount")}
                autoComplete="false"
                id="amount"
                isInvalid={!!errors.amount}
                type="number"
              />
            </InputGroup>

            {errors.amount && (
              <FormHelperText color={"red"}>
                {errors.amount.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Created By</FormLabel>
            <Input value={procedure.createdBy} variant={"unstyle"} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>Created at</FormLabel>
            <Input
              value={new Date(procedure.createdAt).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
              variant={"unstyle"}
              disabled
            />
          </FormControl>
          <FormControl>
            <FormLabel>Updated By</FormLabel>
            <Input value={procedure.updatedBy} variant={"unstyle"} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>Created at</FormLabel>
            <Input
              value={new Date(procedure.updatedAt).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
              variant={"unstyle"}
              disabled
            />
          </FormControl>
        </CardBody>
        <CardFooter as={Stack}>
          <Button
            w={"full"}
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!isDirty || isSubmitting}
          >
            Submit
          </Button>
          <DeleteProcedure procedure={procedure} />
        </CardFooter>
      </Card>
    </form>
  );
};
export default EditProcedureForm;
