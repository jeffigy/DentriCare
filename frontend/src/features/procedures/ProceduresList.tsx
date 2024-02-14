import DashSpinner from "components/Dashboard/DashSpinner";
import { useGetProceduresQuery } from "./proceduresApiSlice";
import {
  Card,
  CardBody,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ErrorType } from "types/Error";
import { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Procedure } from "types/Procedure";
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const ProceduresList = () => {
  const navigate = useNavigate();
  const {
    data: procedures,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProceduresQuery("procedureslist", {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [filterProcedure, setFilterProcedure] = useState("");

  const filteredProcedures = useMemo(() => {
    return Object.values(procedures?.entities ?? {}).filter(
      (item) =>
        (item as Procedure)?.name &&
        (item as Procedure).name
          .toLowerCase()
          .includes(filterProcedure.toLowerCase())
    );
  }, [procedures, filterProcedure]);

  const columns: TableColumn<Procedure | undefined>[] = [
    {
      name: "Procedure Name",
      selector: (row: Procedure | undefined) => row?.name ?? "",
      sortable: true,
      allowOverflow: true,
      grow: 2,
    },
    {
      name: "Amount",
      selector: (row: Procedure | undefined) => row?.amount ?? "",
      sortable: true,
      allowOverflow: true,
      grow: 2,
    },
    {
      name: "Actions",
      cell: (row: Procedure | undefined) =>
        row ? (
          <IconButton
            aria-label="view details "
            icon={<EditIcon />}
            onClick={() => navigate(`/dash/procedures/${row.id}`)}
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
          id="search"
          type="text"
          placeholder="Search procedure"
          value={filterProcedure}
          onChange={(e) => setFilterProcedure(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            aria-label="clear"
            onClick={() => setFilterProcedure("")}
            variant={"ghost"}
            isDisabled={filterProcedure === ""}
            icon={<SmallCloseIcon />}
          />
        </InputRightElement>
      </InputGroup>
    );
    return (
      <Card w={"500px"}>
        <CardBody>
          <DataTable
            title="Procedures List"
            columns={columns as TableColumn<unknown>[]}
            data={filteredProcedures}
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
export default ProceduresList;
