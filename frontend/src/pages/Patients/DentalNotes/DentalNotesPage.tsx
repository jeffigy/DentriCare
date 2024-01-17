import { EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdPostAdd, MdOutlinePayments } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import FloatingButton from "components/FloatingButton";
import { Link, useParams } from "react-router-dom";

const DentalNotesPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <Card>
        <CardHeader>
          <Text>Tooth Number: </Text>
        </CardHeader>
        <CardBody>
          <Stack>
            <Text>Procedures: </Text>
            <Text>Last Update: </Text>
            <Text>Note Date: </Text>
            <Text>Notes: </Text>
          </Stack>
          <CardFooter>
            <Flex justify="space-between" w={"full"}>
              <IconButton
                colorScheme="secondary"
                aria-label="add payment"
                icon={<Icon as={MdOutlinePayments} />}
              />
              <IconButton
                as={Link}
                to={`/dash/patients/${id}/dental-notes/{noteId}`}
                aria-label="edit note"
                icon={<Icon as={EditIcon} />}
              />
              <IconButton
                aria-label="delete note"
                colorScheme="red"
                icon={<Icon as={LuTrash2} />}
              />
            </Flex>
          </CardFooter>
        </CardBody>
      </Card>
      <FloatingButton
        ariaLabel={"new note"}
        icon={MdPostAdd}
        to={`/dash/patients/${id}/dental-notes/new`}
      />
    </div>
  );
};
export default DentalNotesPage;
