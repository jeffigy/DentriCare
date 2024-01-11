import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "hooks/usePersist";
import { useAppSelector } from "app/hooks";
import { selectCurrentToken } from "./authSlice";
import { ErrorType } from "types/ErrorType";
import { Flex, Spinner, useToast } from "@chakra-ui/react";

const PersistLogin = () => {
  const toast = useToast();
  const [persist] = usePersist();
  const token = useAppSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isLoading, isUninitialized, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try {
          await refresh({});
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: `${
          (error as ErrorType)?.data?.message
        } - Please login again`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError]);

  if (!persist) {
    return <Outlet />;
  }

  if (isLoading) {
    return (
      <Flex justify={"center"} align={"center"} w={"full"} h={"100vh"}>
        <Spinner />
      </Flex>
    );
  }

  if (isSuccess && trueSuccess) {
    return <Outlet />;
  }

  if (token && isUninitialized) {
    return <Outlet />;
  }
};
export default PersistLogin;
