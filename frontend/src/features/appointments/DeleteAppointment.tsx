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
import { useDeleteAppointmentMutation } from "./appointmentsApiSlice";

type DeleteAppointmentProps = {
  appointment: {
    id: string;
    date: number;
    patientName: string;
  };
};

const DeleteAppointment: React.FC<DeleteAppointmentProps> = ({
  appointment,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [DeleteAppointment, { isSuccess, isError, error }] =
    useDeleteAppointmentMutation();

  const [delButtonState, setDelButtonState] = useState(false);

  const onDelete = async () => {
    setDelButtonState(true);
    try {
      await DeleteAppointment({ id: appointment.id });
      setDelButtonState(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success.",
        description: "Appointment has been deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "An error occurred.",
        description: (error as ErrorType).data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess, isError]);
  return (
    <>
      <IconButton
        variant={"ghost"}
        as={Flex}
        w={"full"}
        aria-label="delete note"
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
              A you sure on deleting this appointment of patient{" "}
              <Text
                as={"span"}
                color={"red"}
                fontWeight={"bold"}
                fontSize={"lg"}
              >
                {appointment.patientName + " "}
              </Text>
              on
              <Text
                as={"span"}
                color={"red"}
                fontWeight={"bold"}
                fontSize={"lg"}
              >
                {" " + new Date(appointment.date * 1000).toDateString()}
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
export default DeleteAppointment;
