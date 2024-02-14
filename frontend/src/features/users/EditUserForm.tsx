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
  Stack,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ROLES } from "config/roles";
import React, { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/Error";
import { User } from "types/User";
import { UserFormValues } from "types/User";
import { editUserValidation } from "validations/userValidation";
import DeleteUser from "./DeleteUser";
import { useUpdateUserMutation } from "./usersApiSlice";

type EditUserFormProps = {
  user: User;
};

const EditUserForm: React.FC<EditUserFormProps> = ({ user }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [updateUser, { isSuccess, isError, error }] = useUpdateUserMutation();
  const [viewPassword, setViewPassword] = useState(false);
  const handleClick = () => setViewPassword(!viewPassword);
  const [viewConfirmPassword, setviewConfirmPassword] = useState(false);
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
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, dirtyFields, isDirty } = formState;

  const onSubmit = async (data: UserFormValues) => {
    const { fname, lname, email, password, roles, active } = data;
    try {
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
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "User updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      navigate(-1);
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
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
          <Button
            w={"full"}
            isLoading={isSubmitting}
            isDisabled={!isDirty || isSubmitting}
            type="submit"
          >
            Save Changes
          </Button>
          <DeleteUser
            user={{
              id: user.id,
              fname: user.fname,
              lname: user.lname,
            }}
          />
        </CardFooter>
      </Card>
    </form>
  );
};
export default EditUserForm;
