import { Flex } from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import { useGetDentalNotesQuery } from "features/dental-notes/dentalNotesApiSlice";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import EditPaymentForm from "features/payments/EditPaymentForm";
import { useGetPaymentsQuery } from "features/payments/paymentApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";
import { DentalNote } from "types/DentalNote";
import { Patient } from "types/Patient";
import { Payment } from "types/Payment";

const EditPaymentPage = () => {
  useTitle("Edit Payment");
  const { paymentId } = useParams<{ paymentId: string }>();
  const { payment } = useGetPaymentsQuery("paymentsList", {
    selectFromResult: ({ data }) => ({
      payment: data?.entities[paymentId as string],
    }),
  });

  const { patients } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patients: data?.ids.map((id) => data.entities[id]),
    }),
  });

  const { dentalNotes } = useGetDentalNotesQuery("dentalNotesList", {
    selectFromResult: ({ data }) => ({
      dentalNotes: data?.ids.map((id) => data.entities[id]),
    }),
  });

  if (!patients || !payment) return <DashSpinner />;
  return (
    <Flex w={"full"} justify={"center"}>
      <EditPaymentForm
        payment={payment as Payment}
        patients={patients as Patient[]}
        dentalNotes={dentalNotes as DentalNote[]}
      />
    </Flex>
  );
};
export default EditPaymentPage;
