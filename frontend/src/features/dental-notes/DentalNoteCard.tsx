import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Icon,
  IconButton,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useGetDentalNotesQuery } from "features/dental-notes/dentalNotesApiSlice";
import React from "react";
import { MdOutlinePayments } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { DentalNote } from "types/DentalNote";
import DeleteDentalNote from "./DeleteDentalNote";
import useAuth from "hooks/useAuth";

type DentalNoteCardProps = {
  dentalNoteId: string;
};

const DentalNoteCard: React.FC<DentalNoteCardProps> = ({ dentalNoteId }) => {
  const { status } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { dentalNote } = useGetDentalNotesQuery("dentalNotesList", {
    selectFromResult: ({ data }) => ({
      dentalNote: data?.entities[dentalNoteId] as DentalNote,
    }),
  });

  if (dentalNote) {
    return (
      <Card
        w={{
          base: "300px",
          md: "400px",
        }}
      >
        <CardBody>
          <Flex direction={"column"}>
            <Text color={"gray.500"}>Tooth Number:</Text>
            <Box>
              {dentalNote.teethNums &&
                dentalNote.teethNums.map((teethNum) => {
                  return (
                    <Tag mr={"2px"} key={teethNum}>
                      {teethNum}
                    </Tag>
                  );
                })}{" "}
            </Box>
          </Flex>
          <Divider />
          <Flex direction={"column"}>
            <Text color={"gray.500"}>Procedures:</Text>
            <Stack>
              {dentalNote.procedureNames &&
                dentalNote.procedureNames.map((procedure) => {
                  return (
                    <Tag mr={"2px"} key={procedure}>
                      {procedure}
                    </Tag>
                  );
                })}
            </Stack>
          </Flex>
          <Divider />
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}>Date:</Text>
            <Text>
              {" "}
              {new Date(dentalNote.date * 1000)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </Text>
          </Flex>
          {dentalNote.note && (
            <>
              <Divider />
              <Flex direction={"column"}>
                <Text color={"gray.500"}>Notes:</Text>
                <Text>{dentalNote.note}</Text>
              </Flex>
            </>
          )}
          {status === "Admin" ||
            (status === "SuperAdmin" && (
              <>
                <Divider />
                <Flex justify={"space-between"}>
                  <Text color={"gray.500"}> Created By</Text>
                  <Text color={"gray.500"}>{dentalNote.createdBy}</Text>
                </Flex>
                <Divider />
                <Flex justify={"space-between"}>
                  <Text color={"gray.500"}>Creation Date:</Text>
                  <Text color={"gray.500"}>
                    {new Date(dentalNote.createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </Flex>
              </>
            ))}
          {status === "Admin" ||
            (status === "SuperAdmin" && dentalNote.updatedBy && (
              <>
                <Divider />
                <Flex justify={"space-between"}>
                  <Text color={"gray.500"}> Updated By</Text>
                  <Text color={"gray.500"}>{dentalNote.updatedBy}</Text>
                </Flex>
                <Divider />
                <Flex justify={"space-between"}>
                  <Text color={"gray.500"}>Last Updated:</Text>
                  <Text color={"gray.500"}>
                    {new Date(dentalNote.updatedAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </Flex>
              </>
            ))}
        </CardBody>
        <Flex borderTop={"1px solid"} borderColor={"gray.100"}>
          <IconButton
            as={Flex}
            w={"full"}
            variant={"ghost"}
            onClick={() => {}}
            colorScheme="secondary"
            aria-label="add payment"
            icon={<Icon as={MdOutlinePayments} />}
          />
          <Divider orientation="vertical" h={"inherit"} />
          <IconButton
            as={Flex}
            w={"full"}
            variant={"ghost"}
            onClick={() =>
              navigate(`/dash/patients/${id}/dental-notes/${dentalNote._id}`)
            }
            aria-label="edit note"
            icon={<Icon as={EditIcon} />}
          />
          {status === "Admin" ||
            (status === "SuperAdmin" && (
              <>
                {" "}
                <Divider orientation="vertical" h={"inherit"} />
                <DeleteDentalNote dentalNote={dentalNote} />
              </>
            ))}
        </Flex>
      </Card>
    );
  }
};
export default DentalNoteCard;
