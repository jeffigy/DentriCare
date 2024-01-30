import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPaymentsQuery } from "./paymentApiSlice";
import { Payment } from "types/Payment";
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
import { ViewIcon } from "@chakra-ui/icons";
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
          <Divider />
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}>Last Updated:</Text>
            <Text>
              {new Date(payment.updatedAt).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </Flex>
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
              <Flex justify={"space-between"}>
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
          <Divider orientation="vertical" h={"inherit"} />
          <DeletePayment payment={payment} />
        </Flex>
      </Card>
    );
  }
};
export default PaymentCard;
