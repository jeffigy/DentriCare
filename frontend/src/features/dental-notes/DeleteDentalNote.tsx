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
import { ErrorType } from "types/ErrorType";
import { useDeleteDentalNoteMutation } from "./dentalNotesApiSlice";

type DeleteDentalNoteProps = {
  dentalNote: {
    id: string;
    date: number;
  };
};

const DeleteDentalNote: React.FC<DeleteDentalNoteProps> = ({ dentalNote }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [DeleteDentalNote, { isSuccess, isError, error }] =
    useDeleteDentalNoteMutation();

  const [delButtonState, setDelButtonState] = useState(false);

  const onDelete = async () => {
    setDelButtonState(true);
    try {
      await DeleteDentalNote({ id: dentalNote.id });
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
        description: "Dental Note has been deleted.",
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
      <IconButton
        as={Flex}
        w={"full"}
        variant={"ghost"}
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
              A you sure on deleting note with date of{" "}
              <Text
                as={"span"}
                color={"red"}
                fontWeight={"bold"}
                fontSize={"lg"}
              >
                {new Date(dentalNote.date * 1000).toDateString()}
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
export default DeleteDentalNote;
