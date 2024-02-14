import {
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useGetPaymentsQuery } from "features/payments/paymentApiSlice";
import { useGetInstallmentPaymentsQuery } from "features/installment-payment/installmentPaymentApiSlice";
import DashSpinner from "components/Dashboard/DashSpinner";
import { ErrorType } from "types/Error";
const RevenueCard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filter, setFilter] = useState("day");
  const {
    data: payments,
    isError: paymentsIsError,
    isLoading: paymentsIsLoading,
    isSuccess: paymentsIsSuccess,
  } = useGetPaymentsQuery("paymentsList", {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: InstallmentPayments,
    isError: InstallmentPaymentsError,
    isLoading: InstallmentPaymentsLoading,
    isSuccess: InstallmentPaymentsSuccess,
  } = useGetInstallmentPaymentsQuery("InstallmentPayments", {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const isSuccess = paymentsIsSuccess && InstallmentPaymentsSuccess;
  const isError = paymentsIsError || InstallmentPaymentsError;
  const isLoading = paymentsIsLoading || InstallmentPaymentsLoading;
  const error = paymentsIsError ? paymentsIsError : InstallmentPaymentsError;

  let fullPayments = Object.values(payments?.entities ?? {}).filter(
    (item) => item && item.type !== "Installment"
  );

  let formattedInstallmentPayments = Object.values(
    InstallmentPayments?.entities ?? {}
  ).map((installmentPayment) => {
    if (!installmentPayment) {
      return null;
    }
    return {
      ...installmentPayment,
      total: installmentPayment.amount,
    };
  });

  fullPayments = fullPayments.concat(formattedInstallmentPayments as any as []);

  const filteredData = fullPayments.filter((item) => {
    if (filter === "day") {
      return (
        item &&
        new Date(item.date * 1000).toDateString() === new Date().toDateString()
      );
    }
    if (filter === "week") {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return (
        item &&
        new Date(item.date * 1000) >= lastWeek &&
        item &&
        new Date(item.date * 1000) <= today
      );
    }
    if (filter === "month") {
      return (
        item && new Date(item.date * 1000).getMonth() === startDate.getMonth()
      );
    }
    if (filter === "year") {
      return (
        item &&
        new Date(item.date * 1000).getFullYear() === startDate.getFullYear()
      );
    }
    if (filter === "all") {
      return true;
    }
    if (filter === "custom") {
      if (!item) {
        return false;
      }
      let itemDate = new Date(item.date * 1000);
      itemDate.setHours(0, 0, 0, 0);
      let start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      let end = new Date(endDate);
      end.setHours(0, 0, 0, 0);
      return itemDate >= start && itemDate <= end;
    }
  });

  const totalAmount = filteredData.reduce((acc, item) => {
    if (item) {
      return acc + item.total;
    }
    return acc;
  }, 0);

  if (isLoading) {
    return <DashSpinner />;
  }
  if (isError)
    return (
      <Flex justify={"center"}>
        {(error as unknown as ErrorType)?.data?.message}
      </Flex>
    );

  if (isSuccess) {
    return (
      <Card
        w={{
          base: "full",
          md: "400px",
        }}
        mb={"20px"}
      >
        <CardBody as={Flex} direction={"column"} align={"center"}>
          <Flex direction={"column"} align={"center"}>
            <Text color={"gray.500"} fontSize={"25px"}>
              Total Revenue
            </Text>
            {filter === "custom" && (
              <Text color={"gray.500"}>
                {" "}
                From: {new Date(startDate).toLocaleDateString()} - To:{" "}
                {new Date(endDate).toLocaleDateString()}
              </Text>
            )}
            <Text color={"gray.700"} fontSize={"70px"}>
              ₱{new Intl.NumberFormat("en-US").format(totalAmount)}
            </Text>
          </Flex>

          <FormControl mb={"10px"}>
            <FormLabel>Filter by Date</FormLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="day">Today</option>
              <option value="week">Last 7 days</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All</option>
              <option value="custom">Custom</option>
            </Select>
          </FormControl>

          {filter === "custom" && (
            <FormControl>
              <FormLabel>Select Custom Date Range</FormLabel>
              <Flex w={"full"} justify={"center"}>
                <ReactDatePicker
                  selected={startDate}
                  onChange={(dates) => {
                    const [start, end] = dates as Date[];
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
              </Flex>
            </FormControl>
          )}
        </CardBody>
      </Card>
    );
  }
};
export default RevenueCard;
