import { Flex } from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import { useGetDentalNotesQuery } from "features/dental-notes/dentalNotesApiSlice";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import NewPaymentForm from "features/payments/NewPaymentForm";
import useTitle from "hooks/useTitle";
import { DentalNote } from "types/DentalNote";
import { Patient } from "types/Patient";

const NewPaymentPage = () => {
  useTitle("New Payment");
  const { dentalNotes } = useGetDentalNotesQuery("dentalNotesList", {
    selectFromResult: ({ data }) => ({
      dentalNotes: data?.ids.map((id) => data.entities[id]),
    }),
  });

  const { patients } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patients: data?.ids.map((id) => data.entities[id]),
    }),
  });

  if (!patients) return <DashSpinner />;

  return (
    <Flex w={"full"} justify={"center"}>
      <NewPaymentForm
        dentalNotes={dentalNotes as DentalNote[]}
        patients={patients as Patient[]}
      />
    </Flex>
  );
};
export default NewPaymentPage;
