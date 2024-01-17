import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

type NewDentalNoteFormProps = {};

const NewDentalNoteForm: React.FC<NewDentalNoteFormProps> = () => {
  return (
    <form>
      <Card
        w={{
          base: "300px",
          md: "400px",
        }}
      >
        <CardHeader as={Flex} justify={"center"}>
          <Heading size={"md"}>New Dental Note</Heading>
        </CardHeader>
        <CardBody as={Stack} spacing={"10px"}>
          <FormControl>
            <FormLabel>Teeth</FormLabel>
            <Select placeholder="Select Teeth">
              <option value="Adult">Adult</option>
              <option value="Pediatric">Pediatric</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>

            <div className="customDatePickerWidth">
              <DatePicker customInput={<Input />} />
            </div>
          </FormControl>

          <FormControl>
            <FormLabel>Procedure</FormLabel>
            <Select placeholder="Select Procedure">
              <option value="Adult">Adult</option>
              <option value="Pediatric">Pediatric</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Textarea placeholder="Notes" />
          </FormControl>
        </CardBody>
        <CardFooter>
          <Button w="full">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default NewDentalNoteForm;
