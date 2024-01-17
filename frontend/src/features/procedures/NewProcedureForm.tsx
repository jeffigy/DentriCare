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
import { useAddNewProcedureMutation } from "./proceduresApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { ProcedureFormValues } from "types/ProcedureFormValues";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newProcedureValidation } from "validations/procedureValidation";
import { useEffect } from "react";
import { ErrorType } from "types/ErrorType";

const NewProcedureForm = () => {
  const toast = useToast();
  const [addNewProcedure, { isSuccess, isError, error }] =
    useAddNewProcedureMutation();
  const navigate = useNavigate();
  const { email } = useAuth();

  const form = useForm<ProcedureFormValues>({
    defaultValues: {
      name: "",
      amount: 0,
    },
    resolver: yupResolver(
      newProcedureValidation
    ) as Resolver<ProcedureFormValues>,
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async (data: ProcedureFormValues) => {
    const { name, amount } = data;
    try {
      await addNewProcedure({
        name,
        amount,
        createdBy: email,
      });
    } catch (err) {
      console.log("err: ", err);
      toast({
        title: "An error occurred.",
        description: `${err}`,
        status: "error",
        duration: 5000,
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
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate("/dash/procedures");
      toast({
        title: "Success",
        description: "Procedure added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
          <Heading size={"md"}>New Procedure</Heading>
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
        </CardBody>
        <CardFooter>
          <Button
            w={"full"}
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!isDirty || isSubmitting}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default NewProcedureForm;
