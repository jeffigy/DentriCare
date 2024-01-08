import React from "react";
import { useGetPatientsQuery } from "./patientsApiSlice";
import { useNavigate } from "react-router-dom";
import { Patient } from "types/Patient";

type PatientRowProps = {
  patientId: string;
};

const PatientRow: React.FC<PatientRowProps> = ({ patientId }) => {
  console.log("PatientRow", patientId);
  const { patient } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patient: data?.entities[patientId as string] as Patient,
    }),
  });

  const navigate = useNavigate();

  if (patient) {
    const handleEdit = () => navigate(`/dash/patients/${patientId}`);
    return (
      <tr className="table__row user">
        <td className={`table__cell`}>
          {patient.fname} {patient.mname} {patient.lname}
        </td>
        <td className={`table__cell`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            edit
          </button>
        </td>
      </tr>
    );
  } else return null;
};
const PatientRowMemo = React.memo(PatientRow);
export default PatientRowMemo;
