import { Flex, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetInstallmentPaymentsByPaymentIdQuery } from "./installmentPaymentApiSlice";
import DashSpinner from "components/Dashboard/DashSpinner";
import { ErrorType } from "types/ErrorType";
import InstallmentPaymentCard from "./InstallmentPaymentCard";

const InstallmentPaymentsList = () => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const {
    data: installmentPayment,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetInstallmentPaymentsByPaymentIdQuery(paymentId, {
    pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <DashSpinner />;

  if (isError)
    return (
      <Flex justify={"center"}>{(error as ErrorType)?.data?.message}</Flex>
    );

  if (isSuccess) {
    const installmentPaymentsArray = installmentPayment.ids.map(
      (id) => installmentPayment.entities[id]
    );
    const totalAmount = installmentPaymentsArray.reduce(
      (total, payment) => total + (payment?.amount ?? 0),
      0
    );

    return (
      <Stack>
        <Text>
          Total amount Paid: ₱
          {new Intl.NumberFormat("en-US").format(totalAmount)}
        </Text>
        {installmentPayment.ids.map((installmentPaymentId) => (
          <InstallmentPaymentCard
            key={installmentPaymentId as string}
            installmentPaymentId={installmentPaymentId.toString()}
          />
        ))}
      </Stack>
    );
  }
};
export default InstallmentPaymentsList;
