import { InfoOutlineIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import { useGetPaymentsQuery } from "features/payments/paymentApiSlice";
import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/Error";
import { Payment } from "types/Payment";

const BalanceList = () => {
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const {
    data: balances,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useGetPaymentsQuery("paymentsList", {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const columns: TableColumn<Payment | undefined>[] = [
    {
      name: "Patient Name",
      selector: (row: Payment | undefined) => (row ? `${row.patientName}` : ""),
      sortable: true,
      allowOverflow: true,
      grow: 2,
    },
    {
      name: "Balance",
      selector: (row: Payment | undefined) =>
        row ? "₱" + new Intl.NumberFormat("en-US").format(row.balance) : "",
      sortable: true,
      allowOverflow: true,
      style: {
        color: "red",
      },
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <IconButton
          aria-label="view details "
          icon={<InfoOutlineIcon />}
          onClick={() => navigate(`/dash/patients/${row.patient}`)}
        />
      ),
      right: true,
    },
  ];

  if (isLoading) return <DashSpinner />;

  if (isError)
    return (
      <Flex justify={"center"}>{(error as ErrorType)?.data?.message}</Flex>
    );

  if (isSuccess) {
    const paymentsWithBalance = Object.values(balances?.entities ?? {}).filter(
      (item) =>
        item && item.balance !== 0 && item && item.type === "Installment"
    );

    const totalBalance = paymentsWithBalance.reduce(function (
      acc: { [key: string]: any },
      payment
    ) {
      if (payment) {
        const { patient, patientName, balance } = payment;
        if (!acc[patient]) {
          acc[patient] = { patient, patientName, balance: 0 };
        }
        acc[patient].balance += balance;
      }
      return acc;
    },
    {});

    const filteredItems = Object.values(totalBalance).filter(
      (item) =>
        item.patientName &&
        item.patientName.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponent = (
      <InputGroup>
        <Input
          placeholder="Search patient"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            aria-label="clear"
            onClick={() => setFilterText("")}
            variant={"ghost"}
            isDisabled={filterText === ""}
            icon={<SmallCloseIcon />}
          />
        </InputRightElement>
      </InputGroup>
    );
    return (
      <Card w={"500px"}>
        <CardBody>
          <DataTable
            title="Patients with balances"
            columns={columns}
            data={filteredItems}
            dense={true}
            highlightOnHover={true}
            pagination={true}
            pointerOnHover={true}
            striped={true}
            responsive={true}
            subHeader
            subHeaderComponent={subHeaderComponent}
          />
        </CardBody>
      </Card>
    );
  }
};
export default BalanceList;
