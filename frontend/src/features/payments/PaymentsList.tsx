import { useParams } from "react-router-dom";
import { useGetPaymentsQuery } from "./paymentApiSlice";
import DashSpinner from "components/Dashboard/DashSpinner";
import {
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Stack,
  Text,
} from "@chakra-ui/react";
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
  } = useGetPaymentsQuery("paymentsList", {
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
    const { ids, entities } = payments;
    if (
      !ids.length ||
      !ids.filter(
        (paymentId: string | number) => entities[paymentId]?.patient === id
      ).length
    ) {
      return <div>No payments found</div>;
    }
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

  return <div>Have a good coding</div>;
};
export default PaymentsList;
