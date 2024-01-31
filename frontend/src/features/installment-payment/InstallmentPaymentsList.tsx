import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetInstallmentPaymentsByPaymentIdQuery } from "./installmentPaymentApiSlice";
import DashSpinner from "components/Dashboard/DashSpinner";
import { ErrorType } from "types/ErrorType";
import InstallmentPaymentCard from "./InstallmentPaymentCard";

type InstallmentPaymentsListProps = {};

const InstallmentPaymentsList: React.FC<InstallmentPaymentsListProps> = () => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const {
    data: installmentPayment,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetInstallmentPaymentsByPaymentIdQuery(paymentId, {
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
    const installmentPaymentsArray = installmentPayment.ids.map(
      (id) => installmentPayment.entities[id]
    );
    const totalAmount = installmentPaymentsArray.reduce(
      (total, payment) => total + (payment?.amount ?? 0),
      0
    );

    const { ids, entities } = installmentPayment;

    return (
      <Stack>
        <Text>
          Total amount Paid: ₱
          {new Intl.NumberFormat("en-US").format(totalAmount)}
        </Text>
        {ids.length &&
          ids
            .filter((id) => entities[id]?.payment === paymentId)
            .map((installmentPaymentId) => (
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
