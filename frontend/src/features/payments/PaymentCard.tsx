import { ViewIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Divider,
  Flex,
  Icon,
  IconButton,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Payment } from "types/Payment";
import DeletePayment from "./DeletePayment";
import { useGetPaymentsByPatientIdQuery } from "./paymentApiSlice";
import useAuth from "hooks/useAuth";

type PaymentCardProps = {
  paymentId: string;
};

const PaymentCard: React.FC<PaymentCardProps> = ({ paymentId }) => {
  const { status } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { payment } = useGetPaymentsByPatientIdQuery(id, {
    selectFromResult: ({ data }) => ({
      payment: data?.entities[paymentId] as Payment,
    }),
  });

  if (payment) {
    return (
      <Card
        w={{
          base: "300px",
          md: "400px",
        }}
      >
        <CardBody>
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}>Payment Type:</Text>
            <Tag>{payment.type}</Tag>
          </Flex>
          <Divider />
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}>Date of Payment:</Text>
            <Text>
              {" "}
              {new Date(payment.date * 1000)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </Text>
          </Flex>
          <Divider />
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}> Total Amount:</Text>
            <Text>₱{new Intl.NumberFormat("en-US").format(payment.total)}</Text>
          </Flex>
          {payment.type === "Installment" && payment.balance != 0 && (
            <>
              <Divider />
              <Flex justify={"space-between"}>
                <Text color={"gray.500"}> Balance:</Text>
                <Text color="red">
                  ₱{new Intl.NumberFormat("en-US").format(payment.balance)}
                </Text>
              </Flex>
            </>
          )}
          {payment.type === "Installment" && payment.balance === 0 && (
            <>
              <Divider />
              <Flex justify={"space-between"}>
                <Text color={"gray.500"}> Status:</Text>
                <Text>{payment.status}</Text>
              </Flex>
            </>
          )}

          <Divider />

          {payment.remarks && (
            <>
              <Divider />
              <Flex direction={"column"}>
                <Text color={"gray.500"}>Remarks:</Text>
                <Text>{payment.remarks}</Text>
              </Flex>
            </>
          )}
          {payment.planName && (
            <>
              <Divider />
              <Flex direction={"column"}>
                <Text color={"gray.500"}>Plan Name:</Text>
                <Text>{payment.planName}</Text>
              </Flex>
            </>
          )}
        </CardBody>
        <Flex borderTop={"1px solid"} borderColor={"gray.100"}>
          <IconButton
            variant={"ghost"}
            as={Flex}
            w={"full"}
            aria-label=" view details"
            icon={<Icon as={ViewIcon} />}
            onClick={() =>
              navigate(`/dash/patients/${id}/payments/${payment.id}`)
            }
          />
          {status === "Admin" ||
            (status === "SuperAdmin" && (
              <>
                {" "}
                <Divider orientation="vertical" h={"inherit"} />
                <DeletePayment payment={payment} />
              </>
            ))}
        </Flex>
      </Card>
    );
  }
};
export default PaymentCard;
