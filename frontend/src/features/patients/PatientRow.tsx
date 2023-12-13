import { useAppSelector } from "app/hooks";
import React from "react";
import { selectPatientById, Patient } from "./patientsApiSlice";
import { useNavigate } from "react-router-dom";

type PatientRowProps = {
  patientId: string;
};

const PatientRow: React.FC<PatientRowProps> = ({ patientId }) => {
  console.log("patientId", patientId);

  const patient = useAppSelector((state) =>
    selectPatientById(state, patientId)
  ) as Patient;
  console.log("patient", patient);

  const navigate = useNavigate();

  if (patient) {
    const handleEdit = () => navigate(`/dash/patients/${patientId}`);
    return (
      <tr className="table__row user">
        <td className={`table__cell`}>{patient.fname}</td>
        <td className={`table__cell`}>{patient.mname}</td>
        <td className={`table__cell`}>{patient.lname}</td>
        <td className={`table__cell`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            edit
          </button>
        </td>
      </tr>
    );
  }
  return null;
};
export default PatientRow;
