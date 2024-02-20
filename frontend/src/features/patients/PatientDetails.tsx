import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import Detail from "components/Patients/Detail";
import NavCard from "components/Patients/NavCard";
import DeletePatient from "features/patients/DeletePatient";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import useAuth from "hooks/useAuth";
import { FiCalendar } from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { PiNotepadBold } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { Patient } from "types/Patient";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { status } = useAuth();

  const menu = [
    {
      title: "Appointments",
      icon: FiCalendar,
      to: `/dash/patients/${id}/patient-appointments`,
    },
    {
      title: "Medical History",
      icon: LuHistory,
      to: `/dash/patients/${id}/medical-history`,
    },
    {
      title: "Dental Notes",
      icon: PiNotepadBold,
      to: `/dash/patients/${id}/dental-notes`,
    },
    {
      title: "Payments",
      icon: MdOutlinePayments,
      to: `/dash/patients/${id}/payments`,
    },
  ];

  const { patient } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patient: data?.entities[id as string] as Patient,
    }),
  });

  const patientAge = (birthdate: number) => {
    const ageDiffMs = Date.now() - birthdate * 1000;
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  if (!patient) return <DashSpinner />;

  if (patient) {
    const patientDetails = [
      {
        title: "Phone:",
        value: patient.phone,
      },
      {
        title: "Address:",
        value: patient.address,
      },
      {
        title: "Birthdate:",
        value: new Date(patient.bday * 1000)
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" "),
      },
      {
        title: "Age",
        value: patientAge(patient.bday).toString(),
      },
    ];
    return (
      <>
        {" "}
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
              <Text
                fontSize={"24px"}
                fontWeight={"bold"}
                color={"gray.600"}
              >{`${patient.fname} ${patient.mname} ${patient.lname}`}</Text>
            </CardBody>
            <Flex borderTop={"1px solid"} borderColor={"gray.100"}>
              <IconButton
                variant={"ghost"}
                w={"full"}
                aria-label="edit"
                icon={<Icon as={EditIcon} />}
                onClick={() => navigate(`/dash/patients/${id}/edit`)}
              />

              {status === "Admin" ||
                (status === "SuperAdmin" && (
                  <>
                    {" "}
                    <Divider orientation="vertical" h={"inherit"} />
                    <DeletePatient patient={patient} />
                  </>
                ))}
            </Flex>
          </Card>

          <Flex p={"10px"}>
            <Flex direction={"column"}>
              {patientDetails.map((detail, index) => (
                <Detail key={index} title={detail.title} value={detail.value} />
              ))}

              {status === "Admin" ||
                (status === "SuperAdmin" && patient.updatedBy && (
                  <>
                    <Detail title={"Created By:"} value={patient.createdBy} />
                    <Detail
                      title={"Date Created:"}
                      value={new Date(patient.updatedAt).toLocaleString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    />
                    <Detail title={"Updated By:"} value={patient.updatedBy} />
                    <Detail
                      title={"Last Updated:"}
                      value={new Date(patient.updatedAt).toLocaleString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    />
                  </>
                ))}
            </Flex>
          </Flex>
        </Flex>
        <Box flexGrow={1}>
          <SimpleGrid
            spacing={5}
            columns={{
              base: 1,
              lg: 2,
              xl: 3,
            }}
          >
            {menu.map((item, index) => (
              <NavCard
                key={index}
                title={item.title}
                icon={item.icon}
                to={item.to}
              />
            ))}
          </SimpleGrid>
        </Box>
      </>
    );
  }
};
export default PatientDetails;
