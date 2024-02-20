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
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "hooks/useAuth";
import React, { useEffect } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DentalNote } from "types/DentalNote";
import { Patient } from "types/Patient";
import { PaymentFormValues } from "types/Payment";
import { paymentValidation } from "validations/paymentValidation";
import DatePicker from "react-datepicker";
import { useUpdatePaymentMutation } from "./paymentApiSlice";
import { ErrorType } from "types/Error";
import { Payment } from "types/Payment";

type EditPaymentFormProps = {
  payment: Payment;
  patients: Patient[];
  dentalNotes: DentalNote[];
};

const EditPaymentForm: React.FC<EditPaymentFormProps> = ({
  payment,
  patients,
}) => {
  const { email } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [updatePayment, { isSuccess, isError, error }] =
    useUpdatePaymentMutation();
  const form = useForm<PaymentFormValues>({
    defaultValues: {
      patient: payment.patient,
      date: payment.date,
      type: payment.type,
      total: payment.total,
      remarks: payment.remarks,
      planName: payment.planName,
    },
    resolver: yupResolver(paymentValidation) as Resolver<PaymentFormValues>,
  });

  const { register, control, handleSubmit, formState, reset, watch } = form;
  const { errors, isSubmitting, isDirty } = formState;

  const onSubmit = async (data: PaymentFormValues) => {
    const { patient, date, type, total, remarks, planName } = data;

    try {
      await updatePayment({
        id: payment.id,
        patient,
        date,
        type,
        total,
        remarks,
        planName,
        updatedBy: email,
      });
    } catch (error) {
      console.log("error: ", error);
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
        description: "Payment updated successfully!",
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
          sm: "400px",
        }}
      >
        <CardHeader as={Flex} justify={"center"}>
          <Heading size={"md"}>Edit Payment</Heading>
        </CardHeader>
        <CardBody as={Stack} spacing={"10px"}>
          <FormControl isRequired>
            <FormLabel>Patient</FormLabel>
            <Select
              isDisabled
              placeholder="Select patient"
              {...register("patient")}
            >
              {patients &&
                patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.fname} {patient.mname} {patient.lname}
                  </option>
                ))}
            </Select>
          </FormControl>
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
                    customInput={<Input isInvalid={!!errors.date} />}
                    selected={
                      field.value ? new Date(Number(field.value) * 1000) : null
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
            <FormLabel>Total</FormLabel>
            <Input type="number" {...register("total")} />
            {errors.total && (
              <FormHelperText color={"red"}>
                {errors.total.message}
              </FormHelperText>
            )}
          </FormControl>
          {watch("type") === "Full Payment" && (
            <FormControl>
              <FormLabel>Remarks</FormLabel>
              <Textarea {...register("remarks")}></Textarea>
              {errors.remarks && (
                <FormHelperText color={"red"}>
                  {errors.remarks.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
          {watch("type") === "Installment" && (
            <>
              <FormControl>
                <FormLabel>Plan</FormLabel>

                <Textarea {...register("planName")}> </Textarea>
                {errors.planName && (
                  <FormHelperText color={"red"}>
                    {errors.planName.message}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          )}
        </CardBody>
        <CardFooter>
          <Button
            w={"full"}
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!isDirty}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default EditPaymentForm;
