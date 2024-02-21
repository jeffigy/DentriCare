import {
  Button,
  Flex,
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
import { ErrorType } from "types/Error";
import { useDeleteMedicalHistoryMutation } from "./medicalHistoryApiSlice";

type DeleteMedicalHistoryProps = {
  medicalHistoryId: string;
};

const DeleteMedicalHistory: React.FC<DeleteMedicalHistoryProps> = ({
  medicalHistoryId,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [DeleteMedicalHistory, { isSuccess, isError, error }] =
    useDeleteMedicalHistoryMutation();

  const [delButtonState, setDelButtonState] = useState(false);

  const onDelete = async () => {
    setDelButtonState(true);
    try {
      await DeleteMedicalHistory({ id: medicalHistoryId });
      setDelButtonState(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Medical History has been deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: (error as ErrorType).data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError]);

  return (
    <>
      {" "}
      <IconButton
        variant={"ghost"}
        as={Flex}
        w={"full"}
        aria-label="delete medical history"
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
              Are you sure on deleting the medical history? This action cannot
              be undone.
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
export default DeleteMedicalHistory;
