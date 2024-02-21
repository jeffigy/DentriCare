import {
  Button,
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
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/Error";
import { useDeleteProcedureMutation } from "./proceduresApiSlice";

type DeleteProcedureProps = {
  procedure: {
    id: string;
    name: string;
    amount: number;
  };
};

const DeleteProcedure: React.FC<DeleteProcedureProps> = ({ procedure }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delButtonState, setDelButtonState] = useState(false);

  const [DeleteProcedure, { isSuccess, isError, error }] =
    useDeleteProcedureMutation();

  const onDelete = async () => {
    setDelButtonState(true);
    try {
      await DeleteProcedure({ id: procedure.id });
      setDelButtonState(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Procedure has been deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      navigate(-1);
    }
  }, [isSuccess]);

  return (
    <>
      {" "}
      <Button variant={"ghost"} w={"full"} colorScheme="red" onClick={onOpen}>
        Delete Procedure
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Procedure</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete the procedure{" "}
              <Text
                as={"span"}
                color={"red"}
                fontWeight={"bold"}
                fontSize={"lg"}
              >
                {procedure.name}
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
export default DeleteProcedure;
