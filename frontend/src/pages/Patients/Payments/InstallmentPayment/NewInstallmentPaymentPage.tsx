import { Flex } from "@chakra-ui/react";
import NewInstallmentPaymentForm from "features/installment-payment/NewInstallmentPaymentForm";
import useTitle from "hooks/useTitle";
const NewInstallmentPaymentPage = () => {
  useTitle("New Installment Payment");
  return (
    <Flex justify={"center"} w="full">
      <NewInstallmentPaymentForm />
    </Flex>
  );
};
export default NewInstallmentPaymentPage;
