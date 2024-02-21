import { Flex } from "@chakra-ui/react";
import FloatingButton from "components/FloatingButton";
import PaymentsList from "features/payments/PaymentsList";
import useTitle from "hooks/useTitle";
import { MdAddCard } from "react-icons/md";
import { useParams } from "react-router-dom";

const PaymentsPage = () => {
  useTitle("Payments");
  const { id } = useParams<{ id: string }>();
  return (
    <Flex w="full" justify="center">
      <PaymentsList />
      <FloatingButton
        to={`/dash/patients/${id}/payments/new`}
        ariaLabel={"add payment"}
        icon={MdAddCard}
      />
    </Flex>
  );
};
export default PaymentsPage;
