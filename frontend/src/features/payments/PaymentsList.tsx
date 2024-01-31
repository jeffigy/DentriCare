import { useParams } from "react-router-dom";
import { useGetPaymentsByPatientIdQuery } from "./paymentApiSlice";
import DashSpinner from "components/Dashboard/DashSpinner";
import { Flex, Stack } from "@chakra-ui/react";
import { ErrorType } from "types/ErrorType";
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
    const { ids, entities } = payments;
    // if (
    //   !ids.length ||
    //   !ids.filter(
    //     (paymentId: string | number) => entities[paymentId]?.patient === id
    //   ).length
    // ) {
    //   return <div>No payments found</div>;
    // }
    return (
      <Stack>
        {ids.length &&
          ids
            .filter((paymentId) => entities[paymentId]?.patient === id)
            .map((paymentId) => (
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
