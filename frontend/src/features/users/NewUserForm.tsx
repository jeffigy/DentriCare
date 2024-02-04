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
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ROLES } from "config/roles";
import React, { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/ErrorType";
import { UserFormValues } from "types/UserFormValues";
import { newUserValidation } from "validations/userValidation";
import { useAddNewUserMutation } from "./usersApiSlice";

const NewUserForm = () => {
  const toast = useToast();
  const [addNewUser, { isSuccess, isError, error }] = useAddNewUserMutation();
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = React.useState(false);
  const handleClick = () => setViewPassword(!viewPassword);
  const [viewConfirmPassword, setviewConfirmPassword] = useState(false);
  const handleClickConfirmPassword = () =>
    setviewConfirmPassword(!viewConfirmPassword);

  const form = useForm<UserFormValues>({
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: ["Employee"],
    },
    resolver: yupResolver(newUserValidation) as Resolver<UserFormValues>,
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async (data: UserFormValues) => {
    const { fname, lname, email, password, roles } = data;
    if (Object.keys(errors).length === 0) {
      await addNewUser({ fname, lname, email, password, roles });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "User has been created successfully",
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          w={{
            base: "300px",
            md: "400px",
          }}
        >
          <CardHeader as={Flex} justify={"center"}>
            <Heading size={"md"}>New User</Heading>
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
              <CheckboxGroup defaultValue={["Employee"]}>
                <Stack spacing={0}>
                  {Object.values(ROLES).map((role) => (
                    <Checkbox
                      id={role}
                      key={role}
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
          </CardBody>

          <CardFooter>
            <Button
              w={"full"}
              isLoading={isSubmitting}
              isDisabled={!isDirty || isSubmitting}
              type="submit"
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
export default NewUserForm;
