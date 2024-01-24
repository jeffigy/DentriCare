import { EditIcon } from "@chakra-ui/icons";
import {
  Card,
  Text,
  CardBody,
  Stack,
  CardFooter,
  Flex,
  IconButton,
  Icon,
  Box,
  Tag,
} from "@chakra-ui/react";
import { useGetDentalNotesQuery } from "features/dental-notes/dentalNotesApiSlice";
import React from "react";
import { MdOutlinePayments } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { DentalNote } from "types/DentalNote";
import DeleteDentalNote from "./DeleteDentalNote";

type DentalNoteCardProps = {
  dentalNoteId: string;
  id: string | undefined;
};

const DentalNoteCard: React.FC<DentalNoteCardProps> = ({
  dentalNoteId,
  id,
}) => {
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
          <Text>
            Tooth Number:{" "}
            <Box>
              {" "}
              {dentalNote.teethNums &&
                dentalNote.teethNums.map((teethNum) => {
                  return <Tag mr={"2px"}>{teethNum}</Tag>;
                })}{" "}
            </Box>
          </Text>
          <Stack>
            <Text>Procedures:</Text>
            <Stack>
              {dentalNote.procedureNames &&
                dentalNote.procedureNames.map((procedure) => {
                  return <Tag mr={"2px"}>{procedure}</Tag>;
                })}
            </Stack>
            <Text>
              Last Update:{" "}
              {new Date(dentalNote.updatedAt).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
            <Text>Date: {new Date(dentalNote.date * 1000).toDateString()}</Text>
            <Text>
              created on:{" "}
              {new Date(dentalNote.updatedAt).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </Text>
            <Text>Notes: {dentalNote.note}</Text>
          </Stack>
          <CardFooter>
            <Flex justify="space-between" w={"full"}>
              <IconButton
                as={Link}
                // to={`/dash/patients/${id}/dental-notes/{de}/payments`}
                colorScheme="secondary"
                aria-label="add payment"
                icon={<Icon as={MdOutlinePayments} />}
              />
              <IconButton
                onClick={() =>
                  navigate(
                    `/dash/patients/${id}/dental-notes/${dentalNote._id}`
                  )
                }
                aria-label="edit note"
                icon={<Icon as={EditIcon} />}
              />
              <DeleteDentalNote dentalNote={dentalNote} />
            </Flex>
          </CardFooter>
        </CardBody>
      </Card>
    );
  }
};
export default DentalNoteCard;
