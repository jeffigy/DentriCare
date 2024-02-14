import StatsCard from "components/Dashboard/StatCard";
import { useGetUsersQuery } from "features/users/usersApiSlice";
import DashSpinner from "components/Dashboard/DashSpinner";
import { ErrorType } from "types/Error";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import { useGetPaymentsQuery } from "features/payments/paymentApiSlice";
import { useGetInstallmentPaymentsQuery } from "features/installment-payment/installmentPaymentApiSlice";
import { RiShieldUserLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { BsCash } from "react-icons/bs";
import { Flex, SimpleGrid } from "@chakra-ui/react";

const SummaryCards = () => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    isSuccess: isSuccessUsers,
    isError: isErrorUsers,
    error: errorUsers,
  } = useGetUsersQuery("userslist", {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: patients,
    isLoading: isLoadingPatients,
    isSuccess: isSuccessPatients,
    isError: isErrorPatients,
    error: errorPatients,
  } = useGetPatientsQuery("patientslist", {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

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

  const isSuccess =
    paymentsIsSuccess &&
    InstallmentPaymentsSuccess &&
    isSuccessUsers &&
    isSuccessPatients;
  const isError =
    paymentsIsError ||
    InstallmentPaymentsError ||
    isErrorUsers ||
    isErrorPatients;
  const isLoading =
    paymentsIsLoading ||
    InstallmentPaymentsLoading ||
    isLoadingUsers ||
    isLoadingPatients;

  const error = paymentsIsError
    ? paymentsIsError
    : InstallmentPaymentsError
    ? InstallmentPaymentsError
    : isErrorUsers
    ? errorUsers
    : isErrorPatients
    ? errorPatients
    : undefined;

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

  const todaysRevenue = fullPayments
    .filter((item) => {
      return (
        item &&
        new Date(item.date * 1000).toDateString() === new Date().toDateString()
      );
    })
    .reduce((acc, item) => {
      if (item) {
        return acc + item.total;
      }
      return acc;
    }, 0);

  const statsInfo = [
    {
      title: "Total Patients",
      stat: Object.values(patients?.entities ?? {}).length.toString(),
      icon: LuUsers,
    },
    {
      title: "Total Users",
      stat: Object.values(users?.entities ?? {}).length.toString(),
      icon: RiShieldUserLine,
    },
    {
      title: "Today's Revenue",
      stat: "₱" + new Intl.NumberFormat("en-US").format(todaysRevenue),
      icon: BsCash,
    },
  ];

  if (isLoading) {
    return <DashSpinner />;
  }

  if (isError)
    return <Flex justify={"center"}>{(error as ErrorType).data.message}</Flex>;

  if (isSuccess) {
    return (
      <SimpleGrid
        mr={{ base: 0, lg: "15px" }}
        columns={{ base: 1, xl: 3 }}
        spacing={"15px"}
      >
        {statsInfo.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            stat={stat.stat}
            icon={stat.icon}
          />
        ))}
      </SimpleGrid>
    );
  }
};
export default SummaryCards;
