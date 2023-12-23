import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { ROLES } from "config/roles";
import React, { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { User } from "types/User";
import { editUserValidation } from "validations/userValidation";
import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";

import { useNavigate } from "react-router-dom";
import { UserFormValues } from "types/UserFormValues";

type EditUserFormProps = {
  user: User;
};

const EditUserForm: React.FC<EditUserFormProps> = ({ user }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [updateUser, { isSuccess }] = useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();
  const [viewPassword, setViewPassword] = useState(false);
  const handleClick = () => setViewPassword(!viewPassword);
  const [viewConfirmPassword, setviewConfirmPassword] = useState(false);
  const [delButtonState, setDelButtonState] = useState(false);
  const handleClickConfirmPassword = () =>
    setviewConfirmPassword(!viewConfirmPassword);

  const form = useForm<UserFormValues>({
    defaultValues: {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: "",
      confirmPassword: "",
      roles: user.roles,
      active: user.active,
    },
    resolver: yupResolver(editUserValidation) as Resolver<UserFormValues>,
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, dirtyFields } = formState;

  const onSubmit = async (data: UserFormValues) => {
    const { fname, lname, email, password, roles, active } = data;
    if (dirtyFields.password === true || !errors) {
      await updateUser({
        id: user.id,
        fname,
        lname,
        email,
        password,
        roles,
        active,
      });
    } else {
      await updateUser({ id: user.id, fname, lname, email, roles, active });
    }

    console.log("active: ", data.active);
  };

  const onDelete = async () => {
    setDelButtonState(true);
    await deleteUser({ id: user.id });
    setDelButtonState(false);
    // TODO: Fix this toast
    if (isDelError) {
      toast({
        title: "Error",
        description: delError?.toString(),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    if (isDelSuccess) {
      toast({
        title: "User Deleted",
        description: "User deleted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    console.log("isSuccess?: ", isSuccess);

    if ((!isSubmitting && isSuccess) || isDelSuccess) {
      reset();
      navigate("/dash/users");
    }
  }, [isSubmitting, isSuccess, navigate, isDelSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          w={{
            base: "300px",
            md: "400px",
          }}
        >
          <CardHeader as={Flex} justify={"center"}>
            <Heading size={"md"}>Edit User</Heading>
          </CardHeader>
          <CardBody as={Stack} spacing={"10px"}>
            <FormControl>
              <FormLabel htmlFor="fname">First Name</FormLabel>
              <Input
                autoComplete={"false"}
                id="fname"
                isInvalid={!!errors.fname}
                type="text"
                {...register("fname")}
              />
              {errors.fname && (
                <FormHelperText color={"red"}>
                  {errors.fname.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lname">Last Name</FormLabel>
              <Input
                autoComplete={"false"}
                id="lname"
                isInvalid={!!errors.lname}
                type="text"
                {...register("lname")}
              />
              {errors.lname && (
                <FormHelperText color={"red"}>
                  {errors.lname.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                autoComplete="false"
                id="email"
                isInvalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <FormHelperText color={"red"}>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  autoComplete="false"
                  id="password"
                  isInvalid={!!errors.password}
                  type={viewPassword ? "text" : "password"}
                  {...register("password")}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="view-pwd"
                    icon={viewPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant={"ghost"}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormHelperText color={"red"}>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={viewConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  isInvalid={!!errors.confirmPassword}
                  autoComplete="false"
                  {...register("confirmPassword")}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="view-pwd"
                    icon={viewConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant={"ghost"}
                    onClick={handleClickConfirmPassword}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && (
                <FormHelperText color={"red"}>
                  {errors.confirmPassword.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl id="roles">
              <FormLabel>Roles</FormLabel>
              <CheckboxGroup defaultValue={user.roles}>
                <Stack spacing={0}>
                  {Object.values(ROLES).map((role) => (
                    <Checkbox
                      key={role}
                      id={role}
                      value={role}
                      {...register("roles")}
                    >
                      {role}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
              {errors.roles && (
                <FormHelperText color={"red"}>
                  {errors.roles.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="active">Active</FormLabel>
              <Switch id="active" {...register("active")} />
            </FormControl>
          </CardBody>

          <CardFooter as={Stack}>
            <Button w={"full"} isLoading={isSubmitting} type="submit">
              Save Changes
            </Button>
            <>
              <Button
                variant={"ghost"}
                w={"full"}
                colorScheme="red"
                onClick={onOpen}
              >
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
                    <Button
                      variant="ghost"
                      colorScheme="blackAlpha"
                      onClick={onClose}
                    >
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
          </CardFooter>
        </Card>
      </form>
      <DevTool control={control} />
    </>
  );
};
export default EditUserForm;
