import { useGetPatientsQuery } from "./patientsApiSlice";
import PatientRow from "./PatientRow";

const PatientsList = () => {
  const {
    data: patients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPatientsQuery(undefined, {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p>{error.toString()}</p>;
  if (isSuccess) {
    const { ids } = patients;
    // console.log("ids", ids);

    const tableContent = ids?.length
      ? ids.map((patientId) => (
          <PatientRow key={patientId} patientId={String(patientId)} />
        ))
      : null;
    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__edit">
              Patient Name
            </th>
            <th scope="col" className="table__th user__edit">
              edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default PatientsList;
