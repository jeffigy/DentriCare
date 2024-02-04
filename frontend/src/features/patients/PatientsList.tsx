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
import { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/ErrorType";
import { Patient } from "types/Patient";
import { useGetPatientsQuery } from "./patientsApiSlice";

const PatientsList = () => {
  const navigate = useNavigate();
  const {
    data: patients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPatientsQuery("patientslist", {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [filterText, setFilterText] = useState("");
  const filteredItems = useMemo(() => {
    return Object.values(patients?.entities ?? {}).filter(
      (item) =>
        item?.fname &&
        item.fname.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [patients, filterText]);

  const columns: TableColumn<Patient | undefined>[] = [
    {
      name: "Patient Name",
      selector: (row: Patient | undefined) =>
        row ? `${row.fname} ${row.mname} ${row.lname}` : "",
      sortable: true,
      allowOverflow: true,
      grow: 2,
    },
    {
      name: "Actions",
      cell: (row: Patient | undefined) =>
        row ? (
          <IconButton
            aria-label="view details "
            icon={<InfoOutlineIcon />}
            onClick={() => navigate(`/dash/patients/${row.id}`)}
          />
        ) : null,
      right: true,
    },
  ];

  if (isLoading) return <DashSpinner />;

  if (isError)
    return <Flex justify={"center"}>{(error as ErrorType).data.message}</Flex>;

  if (isSuccess) {
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
            title="Patients List"
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
export default PatientsList;
