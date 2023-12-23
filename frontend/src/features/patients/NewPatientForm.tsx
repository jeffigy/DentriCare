import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  CardFooter,
  Button,
} from "@chakra-ui/react";

const NewPatientForm = () => {
  return (
    <Card>
      <CardHeader>
        <Heading size={"md"}>New Patient</Heading>
      </CardHeader>
      <CardBody as={Stack} spacing={"10px"}>
        <FormControl id="fname">
          <FormLabel>First Name</FormLabel>
          <Input type="text" name="hidden" autoComplete={"false"} />
        </FormControl>
        <FormControl id="mname">
          <FormLabel>Last Name</FormLabel>
          <Input type="text" name="hidden" autoComplete={"false"} />
        </FormControl>
        <FormControl id="lname">
          <FormLabel>Last Name</FormLabel>
          <Input type="text" name="hidden" autoComplete={"false"} />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Birthday</FormLabel>
          <Input type="date" name="hidden" autoComplete={"false"} />
        </FormControl>
        <FormControl id="address">
          <FormLabel>Address</FormLabel>
          <InputGroup>
            <Input type="text" name="hidden" autoComplete={"false"} />
          </InputGroup>
        </FormControl>
        <FormControl id="phone">
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <Input type="text" name="hidden" autoComplete={"false"} />
          </InputGroup>
        </FormControl>
      </CardBody>
      <CardFooter>
        <Button w={"full"}>Save</Button>
      </CardFooter>
    </Card>
  );
};
export default NewPatientForm;
