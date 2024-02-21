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
import { useDeleteInstallmentPaymentMutation } from "./installmentPaymentApiSlice";

type DeleteInstallmentPaymentProps = {
  installmentPayment: {
    id: string;
    date: number;
    amount: number;
  };
};

const DeleteInstallmentPayment: React.FC<DeleteInstallmentPaymentProps> = ({
  installmentPayment,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [DeleteInstallmentPayment, { isSuccess, isError, error }] =
    useDeleteInstallmentPaymentMutation();

  const [delButtonState, setDelButtonState] = useState(false);

  const onDelete = async () => {
    setDelButtonState(true);
    try {
      await DeleteInstallmentPayment({ id: installmentPayment.id });
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
        description: "Installment Payment has been deleted.",
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
          <ModalHeader>Delete Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <Text>
              {" "}
              A you sure on deleting installment payment with date of{" "}
              <Text
                as={"span"}
                color={"red"}
                fontWeight={"bold"}
                fontSize={"lg"}
              >
                {new Date(installmentPayment.date * 1000).toDateString()}{" "}
              </Text>
              with the amount of{" "}
              <Text
                as={"span"}
                color={"red"}
                fontWeight={"bold"}
                fontSize={"lg"}
              >
                ₱
                {new Intl.NumberFormat("en-US").format(
                  installmentPayment.amount
                )}
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
export default DeleteInstallmentPayment;
