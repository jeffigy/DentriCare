import {
  Button,
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDeletePatientMutation } from "./patientsApiSlice";
import { useNavigate } from "react-router-dom";

type DeletePatientProps = {
  patient: {
    id: string;
    fname: string;
    mname: string;
    lname: string;
  };
};

const DeletePatient: React.FC<DeletePatientProps> = ({ patient }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [
    deletePatient,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeletePatientMutation();
  const [delButtonState, setDelButtonState] = useState(false);

  const onDelete = async () => {
    setDelButtonState(true);
    try {
      await deletePatient({ id: patient.id });
      setDelButtonState(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isDelSuccess) {
      toast({
        title: "Patient deleted.",
        description: "Patient has been deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      navigate("/dash/patients");
    }
    if (isDelError) {
      toast({
        title: "Patient not deleted.",
        description: "Patient has not been deleted.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  }, [isDelSuccess, isDelError]);

  return (
    <>
      <Button variant={"ghost"} w={"full"} colorScheme="red" onClick={onOpen}>
        Delete Patient
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {" "}
              A you sure on deleting patient{" "}
              <Text
                as={"span"}
                color={"red"}
                fontWeight={"bold"}
                fontSize={"lg"}
              >
                {patient.fname} {patient.mname} {patient.lname}
              </Text>
              ? This action cannot be undone.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" colorScheme="blackAlpha" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={onDelete}
              isLoading={delButtonState}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeletePatient;
