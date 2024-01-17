import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuHistory } from "react-icons/lu";
import { FiFileText, FiCalendar } from "react-icons/fi";
import { MdOutlinePayments, MdOutlineInsertPhoto } from "react-icons/md";
import { PiNotepadBold } from "react-icons/pi";
import DashSpinner from "components/Dashboard/DashSpinner";
import Detail from "components/Patients/Detail";
import NavCard from "components/Patients/NavCard";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import useTitle from "hooks/useTitle";
import { useNavigate, useParams } from "react-router-dom";
import { Patient } from "types/Patient";

const PatientDetailsPage = () => {
  useTitle("Patient Details");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { patient } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patient: data?.entities[id as string] as Patient,
    }),
  });
  console.log(patient);

  if (!patient) return <DashSpinner />;

  const created = new Date(patient.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <Flex
      w={"full"}
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <Flex
        direction={"column"}
        w={{
          base: "full",
          md: "300px",
        }}
        mr={{ base: "0", md: "10px" }}
        mb={{ base: "10px", md: "0" }}
      >
        <Card mb={"10px"}>
          <CardBody as={Flex} direction={"column"} align={"center"} w="full">
            <Flex w={"full"} justify={"space-between"}>
              <Button
                size={"sm"}
                aria-label="edit"
                colorScheme="red"
                leftIcon={<Icon as={DeleteIcon} />}
                onClick={() => navigate(`/dash/patients/${id}/edit`)}
              >
                Delete
              </Button>{" "}
              <Button
                size={"sm"}
                aria-label="edit"
                leftIcon={<Icon as={EditIcon} />}
                onClick={() => navigate(`/dash/patients/${id}/edit`)}
              >
                Edit
              </Button>
            </Flex>
            <Avatar boxSize={"150px"} mb={"10px"} />
            <Text
              fontSize={"24px"}
              fontWeight={"bold"}
              color={"gray.600"}
            >{`${patient.fname} ${patient.mname} ${patient.lname}`}</Text>
          </CardBody>
        </Card>

        <Flex p={"10px"}>
          <Flex direction={"column"}>
            <Detail title={"Phone:"} value={patient.phone} />
            <Detail title={"Address:"} value={patient.address} />
            <Detail
              title={"Birthdate:"}
              value={new Date(patient.bday * 1000).toDateString()}
            />
            <Detail title={"Created By:"} value={patient.createdBy} />
            <Detail title={"Created At:"} value={created} />
          </Flex>
        </Flex>
      </Flex>
      <Stack flexGrow={1}>
        <NavCard
          title={"Treatment Plans"}
          icon={FiFileText}
          to={`/dash/patients/${id}/treatment-plans`}
        />
        <NavCard
          title={"Appointments"}
          icon={FiCalendar}
          to={`/dash/patients/${id}/patient-appointments`}
        />
        <NavCard
          title={"Medical History"}
          icon={LuHistory}
          to={`/dash/patients/${id}/medical-history`}
        />
        <NavCard
          title={"Dental Notes"}
          icon={PiNotepadBold}
          to={`/dash/patients/${id}/dental-notes`}
        />
        <NavCard
          title={"Payments"}
          icon={MdOutlinePayments}
          to={`/dash/patients/${id}/patient-payments`}
        />
        <NavCard
          title={"Photos"}
          icon={MdOutlineInsertPhoto}
          to={`/dash/patients/${id}/photos`}
        />
      </Stack>
    </Flex>
  );
};
export default PatientDetailsPage;
