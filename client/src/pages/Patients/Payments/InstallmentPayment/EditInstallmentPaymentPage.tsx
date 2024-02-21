import { Flex } from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import EditInstallmentPaymentForm from "features/installment-payment/EditInstallmentPaymentForm";
import { useGetInstallmentPaymentsQuery } from "features/installment-payment/installmentPaymentApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";

const EditInstallmentPaymentPage = () => {
  useTitle("Edit Installment Payment");
  const { installmentPaymentId } = useParams<{
    installmentPaymentId: string;
  }>();

  const { installmentPayment } = useGetInstallmentPaymentsQuery(
    "installmentPaymentsList",
    {
      selectFromResult: ({ data }) => ({
        installmentPayment: data?.entities[installmentPaymentId as string],
      }),
    }
  );
  if (!installmentPayment) return <DashSpinner />;
  return (
    <Flex w={"full"} justify={"center"}>
      <EditInstallmentPaymentForm installmentPayment={installmentPayment} />
    </Flex>
  );
};
export default EditInstallmentPaymentPage;
