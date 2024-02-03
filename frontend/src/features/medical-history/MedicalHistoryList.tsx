import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";
import { useGetMedicalHistoriesByPatientIdQuery } from "./medicalHistoryApiSlice";
import DashSpinner from "components/Dashboard/DashSpinner";
import { Flex, Stack } from "@chakra-ui/react";
import { ErrorType } from "types/ErrorType";
import MedicalHistoryCard from "./MedicalHistoryCard";

const MedicalHistoryList = () => {
  useTitle("Medical History");
  const { id } = useParams();
  const {
    data: medicalHistories,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetMedicalHistoriesByPatientIdQuery(id, {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <DashSpinner />;

  if (isError)
    return (
      <Flex justify={"center"}>{(error as ErrorType)?.data?.message}</Flex>
    );

  if (isSuccess) {
    return (
      <Stack>
        {medicalHistories.ids.map((medicalHistoryId) => (
          <MedicalHistoryCard
            key={medicalHistoryId}
            medicalHistoryId={medicalHistoryId.toString()}
          />
        ))}
      </Stack>
    );
  }
};
export default MedicalHistoryList;
