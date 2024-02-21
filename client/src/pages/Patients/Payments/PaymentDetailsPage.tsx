import { Flex } from "@chakra-ui/react";
import PaymentDetails from "features/payments/PaymentDetails";

import useTitle from "hooks/useTitle";

const PaymentDetailsPage = () => {
  useTitle("Payment Details");

  return (
    <Flex w={"full"} direction={"column"} align={"center"}>
      <PaymentDetails />
    </Flex>
  );
};
export default PaymentDetailsPage;
