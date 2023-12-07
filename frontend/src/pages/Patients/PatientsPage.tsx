import PatientsList from "features/patients/PatientsList";
import React from "react";

type PatientsPageProps = {};

const PatientsPage: React.FC<PatientsPageProps> = () => {
  return (
    <div>
      patients page
      <br />
      <PatientsList />
    </div>
  );
};
export default PatientsPage;
