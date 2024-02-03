import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMedicalHistoriesQuery } from "./medicalHistoryApiSlice";
import { MedicalHistory } from "types/MedicalHistory";
import {
  Card,
  CardBody,
  Divider,
  Flex,
  Text,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import DeleteMedicalHistory from "./DeleteMedicalHistory";

type MedicalHistoryCardProps = {
  medicalHistoryId: string;
};

const MedicalHistoryCard: React.FC<MedicalHistoryCardProps> = ({
  medicalHistoryId,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { medicalHistory } = useGetMedicalHistoriesQuery("medicalHistoryList", {
    selectFromResult: ({ data }) => ({
      medicalHistory: data?.entities[medicalHistoryId] as MedicalHistory,
    }),
  });

  if (medicalHistory) {
    return (
      <Card
        w={{
          base: "300px",
          md: "400px",
        }}
      >
        <CardBody>
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}>Patient Name:</Text>
            <Text>{medicalHistory.patientName}</Text>
          </Flex>
          <Divider />
          {medicalHistory.message && (
            <>
              <Divider />
              <Flex direction={"column"}>
                <Text color={"gray.500"}>Message:</Text>
                <Text>{medicalHistory.message}</Text>
              </Flex>
            </>
          )}
          <Divider />
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}> Created By:</Text>
            <Text color={"gray.500"}>{medicalHistory.createdBy}</Text>
          </Flex>
          <Divider />
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}>Creation Date:</Text>
            <Text color={"gray.500"}>
              {new Date(medicalHistory.createdAt).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </Flex>
          {medicalHistory.updatedBy && (
            <>
              <Divider />
              <Flex justify={"space-between"}>
                <Text color={"gray.500"}> Updated By</Text>
                <Text color={"gray.500"}>{medicalHistory.updatedBy}</Text>
              </Flex>
              <Divider />
              <Flex justify={"space-between"}>
                <Text color={"gray.500"}>Last Updated:</Text>
                <Text color={"gray.500"}>
                  {new Date(medicalHistory.updatedAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </Flex>
            </>
          )}
        </CardBody>{" "}
        <Flex borderTop={"1px solid"} borderColor={"gray.100"}>
          <IconButton
            variant={"ghost"}
            as={Flex}
            w={"full"}
            onClick={() =>
              navigate(
                `/dash/patients/${id}/medical-history/${medicalHistory._id}`
              )
            }
            aria-label="edit medicalHistory"
            icon={<Icon as={EditIcon} />}
          />
          <Divider orientation="vertical" h={"inherit"} />
          <DeleteMedicalHistory medicalHistoryId={medicalHistory.id} />
        </Flex>
      </Card>
    );
  }
};
export default MedicalHistoryCard;
