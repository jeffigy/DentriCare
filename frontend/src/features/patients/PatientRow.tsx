import React from "react";
import { useGetPatientsQuery } from "./patientsApiSlice";
import { useNavigate } from "react-router-dom";
import { Patient } from "types/Patient";
import { Tr, Td, IconButton, Icon } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

type PatientRowProps = {
  patientId: string;
};

const PatientRow: React.FC<PatientRowProps> = ({ patientId }) => {
  const { patient } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patient: data?.entities[patientId as string] as Patient,
    }),
  });

  const navigate = useNavigate();

  if (patient) {
    return (
      <Tr>
        <Td>
          {patient.fname} {patient.mname} {patient.lname}
        </Td>
        <Td>
          <IconButton
            onClick={() => navigate(`/dash/patients/${patientId}`)}
            aria-label="patient info"
            icon={<Icon as={InfoOutlineIcon} />}
          />
        </Td>
      </Tr>
    );
  } else return null;
};
const PatientRowMemo = React.memo(PatientRow);
export default PatientRowMemo;
