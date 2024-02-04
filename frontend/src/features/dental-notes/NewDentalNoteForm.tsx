import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { permanentTeeths, primaryTeeths } from "config/teethChart";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DentalNoteFormValues } from "types/DentalNoteFormValues";
import { ErrorType } from "types/ErrorType";
import { Procedure } from "types/Procedure";
import { dentalNoteValidation } from "validations/dentalNoteValidation";
import { useAddNewDentalNoteMutation } from "./dentalNotesApiSlice";

type NewDentalNoteFormProps = {
  patientId: string;
  procedures: Procedure[];
};

const NewDentalNoteForm: React.FC<NewDentalNoteFormProps> = ({
  patientId,
  procedures,
}) => {
  const { email } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [addNewDentalNote, { isSuccess, isError, error }] =
    useAddNewDentalNoteMutation();

  const form = useForm<DentalNoteFormValues>({
    defaultValues: {
      date: undefined,
      procedures: [""],
      note: "",
      teethType: "",
      teethNums: [],
    },
    resolver: yupResolver(
      dentalNoteValidation
    ) as Resolver<DentalNoteFormValues>,
  });
  const { register, control, handleSubmit, formState, reset, watch, setValue } =
    form;
  const { errors, isSubmitting, dirtyFields } = formState;

  const teethType = watch("teethType");

  const onSubmit = async (data: DentalNoteFormValues) => {
    const { date, procedures, note, teethType, teethNums } = data;

    try {
      await addNewDentalNote({
        patient: patientId,
        date,
        procedures,
        note,
        teethType,
        teethNums,
        createdBy: email,
      });
    } catch (error) {
      console.log("error: ", error);
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
      reset();
      navigate(-1);
      toast({
        title: "Success",
        description: "New dental note added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (teethType) {
      setValue("teethNums", []);
    }
  }, [teethType, setValue]);
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
            <Heading size={"md"}>New Dental Note</Heading>
          </CardHeader>
          <CardBody as={Stack} spacing={"10px"}>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <div className="customDatePickerWidth">
                    <DatePicker
                      minDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      customInput={<Input isInvalid={!!errors.date} />}
                      selected={
                        field.value
                          ? new Date(Number(field.value) * 1000)
                          : null
                      }
                      onChange={(date) =>
                        field.onChange(date ? date.getTime() / 1000 : 0)
                      }
                    />
                  </div>
                )}
              />
              {errors.date && (
                <FormHelperText color={"red"}>
                  {errors.date.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Procedure</FormLabel>

              <Stack spacing={0}>
                {procedures &&
                  procedures.map((procedure) => (
                    <Checkbox
                      key={procedure.id}
                      value={procedure.id}
                      {...register("procedures")}
                    >
                      {procedure.name}
                    </Checkbox>
                  ))}
              </Stack>
              {errors.procedures && (
                <FormHelperText color={"red"}>
                  {errors.procedures.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Note</FormLabel>
              <Textarea placeholder="Add note" {...register("note")} />
            </FormControl>

            <FormControl>
              <FormLabel>Teeth Type</FormLabel>
              <Select placeholder="Select Teeth" {...register("teethType")}>
                <option value="pediatric">Pediatric</option>
                <option value="adult">Adult</option>
              </Select>
            </FormControl>

            {teethType && (
              <FormControl>
                <FormLabel>Select Teeths</FormLabel>
                {teethType === "pediatric" ? (
                  <Box>
                    {Object.keys(primaryTeeths).map((key) => (
                      <Checkbox
                        key={key}
                        value={key}
                        {...register("teethNums")}
                      >
                        {key}
                      </Checkbox>
                    ))}
                  </Box>
                ) : null}

                {teethType === "adult" ? (
                  <Box>
                    {Object.keys(permanentTeeths).map((key) => (
                      <Checkbox
                        key={key}
                        value={key}
                        {...register("teethNums")}
                      >
                        {key}
                      </Checkbox>
                    ))}
                  </Box>
                ) : null}
              </FormControl>
            )}
          </CardBody>
          <CardFooter>
            <Button
              w="full"
              type="submit"
              isDisabled={
                // disable submit if date and procedures are empty
                !dirtyFields.date || !dirtyFields.procedures
              }
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
      <DevTool control={control} />
    </>
  );
};
export default NewDentalNoteForm;
