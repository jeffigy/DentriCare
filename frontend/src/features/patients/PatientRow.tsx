import { useAppSelector } from "app/hooks";
import React from "react";
import { selectPatientById } from "./patientsApiSlice";
import { useNavigate } from "react-router-dom";
import { Patient } from "types/Patient";

type PatientRowProps = {
  patientId: string;
};

const PatientRow: React.FC<PatientRowProps> = ({ patientId }) => {
  const patient = useAppSelector((state) =>
    selectPatientById(state, patientId)
  ) as Patient;

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
