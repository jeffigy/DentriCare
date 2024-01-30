import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetInstallmentPaymentsQuery } from "./installmentPaymentApiSlice";
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
  } = useGetInstallmentPaymentsQuery("installmentPaymentsList", {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <DashSpinner />;

  if (isError)
    return (
      <Alert status="error">
        <AlertIcon />
        {(error as ErrorType)?.data?.message}
      </Alert>
    );
  if (isSuccess) {
    const { ids, entities } = installmentPayment;

    if (
      !ids.length ||
      !ids.filter((id: string | number) => entities[id]?.payment === paymentId)
        .length
    ) {
      return (
        <Alert status="error">
          <AlertIcon />
          No installment payments found
        </Alert>
      );
    }
    return (
      <Stack>
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
