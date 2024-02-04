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
  Stack,
  useToast,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorType } from "types/ErrorType";
import { InstallmentPaymentFormValues } from "types/InstallmentPayment";
import { installmentPaymentValidation } from "validations/installmentPaymentValidation";
import { useAddNewInstallmentPaymentMutation } from "./installmentPaymentApiSlice";

const NewInstallmentPaymentForm = () => {
  const { paymentId } = useParams<{ id: string; paymentId: string }>();
  const { email } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [addNewInstallmentPayment, { isSuccess, isError, error }] =
    useAddNewInstallmentPaymentMutation();

  const form = useForm<InstallmentPaymentFormValues>({
    defaultValues: {
      date: undefined,
      amount: undefined,
      remarks: "",
    },
    resolver: yupResolver(
      installmentPaymentValidation
    ) as Resolver<InstallmentPaymentFormValues>,
  });

  const { register, control, handleSubmit, formState, reset } = form;

  const { errors, isSubmitting, dirtyFields } = formState;

  const onSubmit = async (data: InstallmentPaymentFormValues) => {
    const { date, amount, remarks } = data;

    try {
      await addNewInstallmentPayment({
        payment: paymentId,
        date,
        amount,
        remarks,
        createdBy: email,
      });
    } catch (err) {
      console.log(err);
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
        description: "Payment added successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Card
          w={{
            base: "300px",
            md: "400px",
          }}
        >
          <CardHeader as={Flex} justify={"center"}>
            <Heading size={"md"}>New Installment Payment </Heading>
          </CardHeader>
          <CardBody as={Stack} spacing={"10px"}>
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <div className="customDatePickerWidth">
                    <DatePicker
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      customInput={
                        <Input
                          isInvalid={!!errors.date}
                          autoComplete="false"
                          name="hidden"
                        />
                      }
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
              {errors.date && (
                <FormHelperText color={"red"}>
                  {errors.date.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
              <Input type="number" {...register("amount")} />
              {errors.amount && (
                <FormHelperText color={"red"}>
                  {errors.amount.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Remarks</FormLabel>
              <Input type="text" {...register("remarks")} />
              {errors.remarks && (
                <FormHelperText color={"red"}>
                  {errors.remarks.message}
                </FormHelperText>
              )}
            </FormControl>
          </CardBody>
          <CardFooter>
            <Button
              w={"full"}
              type="submit"
              isDisabled={!dirtyFields.date || !dirtyFields.amount}
              isLoading={isSubmitting}
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
export default NewInstallmentPaymentForm;
