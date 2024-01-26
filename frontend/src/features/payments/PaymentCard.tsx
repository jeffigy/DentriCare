import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPaymentsQuery } from "./paymentApiSlice";
import { Payment } from "types/Payment";
import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import DeletePayment from "./DeletePayment";

type PaymentCardProps = {
  paymentId: string;
};

const PaymentCard: React.FC<PaymentCardProps> = ({ paymentId }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { payment } = useGetPaymentsQuery("paymentsList", {
    selectFromResult: ({ data }) => ({
      payment: data?.entities[paymentId] as Payment,
    }),
  });

  if (payment) {
    return (
      <Card w={"300px"}>
        <CardBody>
          <Text>Payment Type: {payment.type}</Text>
          <Text>
            Date of Payment:{" "}
            {new Date(payment.date * 1000)
              .toDateString()
              .split(" ")
              .slice(1)
              .join(" ")}
          </Text>
          <Text>Total Amount: {payment.total}</Text>
          {payment.remarks && <Text>Remarks: {payment.remarks}</Text>}
          <Text>
            Last Updated:{" "}
            {new Date(payment.updatedAt).toLocaleString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>
          {payment.remarks && <Text>Remarks: {payment.remarks}</Text>}
          {payment.planName && <Text>Plan Name: {payment.planName}</Text>}
          {payment.initPayment && (
            <Text>Initial Payment: {payment.initPayment}</Text>
          )}
          {payment.initPaymentRemarks && (
            <Text>Initial Payment Remarks: {payment.initPaymentRemarks}</Text>
          )}
        </CardBody>
        <CardFooter as={Flex} justify={"space-between"}>
          <IconButton
            aria-label="edit"
            icon={<Icon as={EditIcon} />}
            onClick={() =>
              navigate(`/dash/patients/${id}/payments/${payment.id}`)
            }
          />
          <DeletePayment payment={payment} />
        </CardFooter>
      </Card>
    );
  }
};
export default PaymentCard;
