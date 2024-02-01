import {
  Button,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/ErrorType";
import { useDeletePatientMutation } from "./patientsApiSlice";

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
  const [deletePatient, { isSuccess, isError, error }] =
    useDeletePatientMutation();
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
    if (isSuccess) {
      toast({
        title: "Patient deleted.",
        description: "Patient has been deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      navigate(-1);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Patient not deleted.",
        description: `${(error as ErrorType).data.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  }, [isError]);

  return (
    <>
      <IconButton
        aria-label="delete patient"
        variant={"ghost"}
        w={"full"}
        icon={<Icon as={LuTrash2} />}
        colorScheme="red"
        onClick={onOpen}
      />

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
