import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import InstallmentPaymentsList from "features/installment-payment/InstallmentPaymentsList";
import DeletePayment from "features/payments/DeletePayment";
import { useGetPaymentsByPatientIdQuery } from "features/payments/paymentApiSlice";
import useAuth from "hooks/useAuth";

import { useNavigate, useParams } from "react-router-dom";
import { Payment } from "types/Payment";

const PaymentDetails = () => {
  const { status } = useAuth();
  const navigate = useNavigate();
  const { id, paymentId } = useParams<{ id: string; paymentId: string }>();
  const { payment } = useGetPaymentsByPatientIdQuery(id, {
    selectFromResult: ({ data }) => ({
      payment: data?.entities[paymentId as string] as Payment,
    }),
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (!payment) return <DashSpinner />;
  return (
    <>
      {" "}
      <Card
        w={{
          base: "300px",
          sm: "400px",
        }}
        mb={"20px"}
      >
        <CardHeader as={Flex} justify={"center"}>
          <Heading size={"md"}> Payment Details</Heading>
        </CardHeader>
        <CardBody>
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}> Payment Type:</Text>
            <Text>{payment.type}</Text>
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
          {status === "Admin" ||
            (status === "SuperAdmin" && (
              <>
                <Divider />
                <Flex justify={"space-between"}>
                  <Text color={"gray.500"}> Created By</Text>
                  <Text color={"gray.500"}>{payment.createdBy}</Text>
                </Flex>
                <Divider />
                <Flex justify={"space-between"}>
                  <Text color={"gray.500"}>Creation Date:</Text>
                  <Text color={"gray.500"}>
                    {new Date(payment.createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </Flex>
              </>
            ))}
          {status === "Admin" ||
            (status === "SuperAdmin" && payment.updatedBy && (
              <>
                <Divider />
                <Flex justify={"space-between"}>
                  <Text color={"gray.500"}> Updated By</Text>
                  <Text color={"gray.500"}>{payment.updatedBy}</Text>
                </Flex>
                <Divider />
                <Flex justify={"space-between"}>
                  <Text color={"gray.500"}>Last Updated:</Text>
                  <Text color={"gray.500"}>
                    {new Date(payment.updatedAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </Flex>
              </>
            ))}
        </CardBody>

        <Flex borderTop={"1px solid"} borderColor={"gray.100"}>
          <IconButton
            variant={"ghost"}
            as={Flex}
            w={"full"}
            onClick={() =>
              navigate(`/dash/patients/${id}/payments/${payment.id}/edit`)
            }
            aria-label="edit"
            icon={<Icon as={EditIcon} />}
          />
          {status === "Admin" ||
            (status === "SuperAdmin" && (
              <>
                <Divider orientation="vertical" h={"inherit"} />
                <DeletePayment payment={payment} backToPrev={true} />
              </>
            ))}
        </Flex>
      </Card>
      {payment.type === "Installment" && (
        <>
          {" "}
          <Flex
            w={{ base: "300px",    sm: "400px",}}
            justify={"space-between"}
            align={"center"}
            mb={"20px"}
          >
            <Text>Installment Payments</Text>
            <Button
              borderRadius={"md"}
              leftIcon={<AddIcon />}
              isDisabled={payment.balance === 0}
              onClick={() =>
                navigate(
                  `/dash/patients/${id}/payments/${payment.id}/installment-payment/new`
                )
              }
            >
              Payment
            </Button>
          </Flex>
          <InstallmentPaymentsList />
        </>
      )}
    </>
  );
};
export default PaymentDetails;
