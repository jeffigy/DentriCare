import React from "react";
import { Procedure } from "types/Procedure";
import { useGetProceduresQuery } from "./proceduresApiSlice";
import { useNavigate } from "react-router-dom";
import { Tr, Td, IconButton, Icon } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

type ProcedureRowProps = {
  procedureId: string;
};

const ProcedureRow: React.FC<ProcedureRowProps> = ({ procedureId }) => {
  const { procedure } = useGetProceduresQuery("proceduresList", {
    selectFromResult: ({ data }) => ({
      procedure: data?.entities[procedureId as string] as Procedure,
    }),
  });

  const navigate = useNavigate();

  if (procedure) {
    return (
      <Tr>
        <Td>{procedure.name}</Td>
        <Td>{procedure.amount}</Td>
        <Td>
          <IconButton
            aria-label="edit procedure"
            icon={<Icon as={EditIcon} />}
            onClick={() => navigate(`/dash/procedures/${procedureId}`)}
          />
        </Td>
      </Tr>
    );
  }
};
export default ProcedureRow;
