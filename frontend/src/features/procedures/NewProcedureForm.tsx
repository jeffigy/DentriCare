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
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/Error";
import { ProcedureFormValues } from "types/Procedure";
import { newProcedureValidation } from "validations/procedureValidation";
import { useAddNewProcedureMutation } from "./proceduresApiSlice";

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
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate(-1);
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
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
              <InputLeftAddon children="₱" borderRadius={0} />
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
