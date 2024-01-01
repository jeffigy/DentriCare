import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "app/hooks";
import { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormValues } from "types/loginFormValues";
import { loginValidation } from "validations/loginValidation";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPwd, setShowPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidation) as Resolver<LoginFormValues>,
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async (data: LoginFormValues, e: any) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      navigate("/dash");
    } catch (error: any) {
      if (!error.status) {
        setErrMsg("Network Error");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(error.data.message);
      }

      toast({
        title: "Login Failed",
        description: errMsg || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        w={{
          base: "300px",
          md: "400px",
        }}
      >
        <CardBody>
          <Stack>
            {" "}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                autoComplete="false"
                id="email"
                type="email"
                {...register("email")}
                isInvalid={!!errors.email}
              />
              {errors.email && (
                <FormHelperText color={"red"}>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  autoComplete="false"
                  id="password"
                  type={showPwd ? "text" : "password"}
                  {...register("password")}
                  isInvalid={!!errors.password}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="show-password"
                    icon={showPwd ? <ViewOffIcon /> : <ViewIcon />}
                    variant={"ghost"}
                    onClick={() => setShowPwd(!showPwd)}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormHelperText color={"red"}>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter>
          {" "}
          <Button
            isLoading={isSubmitting}
            isDisabled={!isDirty || isSubmitting}
            type="submit"
            w={"full"}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default Login;
