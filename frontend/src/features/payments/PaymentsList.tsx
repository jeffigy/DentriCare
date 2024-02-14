import { useParams } from "react-router-dom";
import { useGetPaymentsByPatientIdQuery } from "./paymentApiSlice";
import DashSpinner from "components/Dashboard/DashSpinner";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { ErrorType } from "types/Error";
import PaymentCard from "./PaymentCard";

const PaymentsList = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: payments,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetPaymentsByPatientIdQuery(id, {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <DashSpinner />;

  if (isError)
    return (
      <Flex justify={"center"}>{(error as ErrorType)?.data?.message}</Flex>
    );

  if (isSuccess) {
    const totalRevenue = Object.keys(payments.entities).reduce(
      (sum, paymentId) => {
        const payment = payments.entities[paymentId];
        if (payment?.balance) {
          return sum + (payment.totalAmount ?? 0);
        } else {
          return sum + (payment?.total ?? 0);
        }
      },
      0
    );

    const totalBalance = Object.keys(payments.entities).reduce(
      (sum, paymentId) => {
        const payment = payments.entities[paymentId];
        if (payment?.balance) {
          return sum + (payment.balance ?? 0);
        } else {
          return sum;
        }
      },
      0
    );

    return (
      <Stack>
        <Flex w={"full "} justify={"space-between"}>
          {" "}
          <Text>Total Revenue</Text>
          <Text> ₱{new Intl.NumberFormat("en-US").format(totalRevenue)}</Text>
        </Flex>
        <Flex w={"full "} justify={"space-between"}>
          {" "}
          <Text>Total Balance</Text>
          <Text color={"red"}>
            {" "}
            ₱{new Intl.NumberFormat("en-US").format(totalBalance)}
          </Text>
        </Flex>
        {payments.ids.map((paymentId) => (
          <PaymentCard
            key={paymentId as string}
            paymentId={paymentId.toString()}
          />
        ))}
      </Stack>
    );
  }
};
export default PaymentsList;
