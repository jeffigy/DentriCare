import {
  Button,
  Modal,
  ModalOverlay,
  Text,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/ErrorType";

type DeleteUserProps = {
  user: {
    id: string;
    fname: string;
    lname: string;
  };
};

const DeleteUser: React.FC<DeleteUserProps> = ({ user }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delButtonState, setDelButtonState] = useState(false);
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const onDelete = async () => {
    setDelButtonState(true);
    try {
      await deleteUser({ id: user.id });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isDelSuccess) {
      toast({
        title: "User deleted.",
        description: "User has been deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      navigate("/dash/users");
    }
    if (isDelError) {
      toast({
        title: "An error occurred.",
        description: (delError as ErrorType).data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isDelSuccess, isDelError]);

  return (
    <>
      <Button variant={"ghost"} w={"full"} colorScheme="red" onClick={onOpen}>
        Delete User
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {" "}
              A you sure on deleting user{" "}
              <Text
                as={"span"}
                color={"red"}
                fontWeight={"bold"}
                fontSize={"lg"}
              >
                {user.fname} {user.lname}
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
export default DeleteUser;
