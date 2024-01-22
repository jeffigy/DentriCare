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
import useAuth from "hooks/useAuth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DentalNote } from "types/DentalNote";
import { useUpdateDentalNoteMutation } from "./dentalNotesApiSlice";
import { Controller, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DentalNoteFormValues } from "types/DentalNoteFormValues";
import { dentalNoteValidation } from "validations/dentalNoteValidation";
import { DevTool } from "@hookform/devtools";
import { primaryTeeths, permanentTeeths } from "config/teethChart";
import ReactDatePicker from "react-datepicker";
import { Procedure } from "types/Procedure";
import { ErrorType } from "types/ErrorType";

type EditDentalNoteFormProps = {
  dentalNote: DentalNote;
  procedures: Procedure[];
  patientId: string | undefined;
};

const EditDentalNoteForm: React.FC<EditDentalNoteFormProps> = ({
  dentalNote,
  procedures,
  patientId,
}) => {
  const { email } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [updateDentalNote, { isSuccess, isError, error }] =
    useUpdateDentalNoteMutation();

  const form = useForm<DentalNoteFormValues>({
    defaultValues: {
      date: dentalNote.date,
      procedures: dentalNote.procedures.map((proc) => proc),
      note: dentalNote.note,
      teethType: dentalNote.teethType,
      teethNums: dentalNote.teethNums.map((teethNum) => teethNum.toString()),
    },
    resolver: yupResolver(
      dentalNoteValidation
    ) as Resolver<DentalNoteFormValues>,
  });

  const { register, control, handleSubmit, formState, reset, watch, setValue } =
    form;

  const { errors, isSubmitting, dirtyFields, isDirty } = formState;

  const teethType = watch("teethType");

  const onSubmit = async (data: DentalNoteFormValues) => {
    const { date, procedures, note, teethType, teethNums } = data;

    try {
      await updateDentalNote({
        id: dentalNote.id,
        date,
        procedures,
        note,
        teethType,
        teethNums,
        updatedBy: email,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "An error occurred.",
        description: `${(error as ErrorType)?.data?.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate(`/dash/patients/${patientId}/dental-notes`);
      toast({
        title: "Success",
        description: "Dental Note updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (teethType && dirtyFields.teethType) {
      setValue("teethNums", []);
    }
  }, [teethType]);
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
                    <ReactDatePicker
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

            <FormControl>
              <FormLabel>Created By</FormLabel>
              <Input
                value={dentalNote.createdBy}
                variant={"unstyle"}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>Created at</FormLabel>
              <Input
                value={new Date(dentalNote.createdAt).toLocaleString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
                variant={"unstyle"}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>Updated By</FormLabel>
              <Input
                value={dentalNote.updatedBy}
                variant={"unstyle"}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>Updated at</FormLabel>
              <Input
                value={new Date(dentalNote.updatedAt).toLocaleString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
                variant={"unstyle"}
                disabled
              />
            </FormControl>
          </CardBody>
          <CardFooter>
            <Button
              w="full"
              type="submit"
              isDisabled={
                !isDirty ||
                isSubmitting ||
                Object.keys(errors).length > 0 ||
                Object.keys(dirtyFields).length === 0
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
export default EditDentalNoteForm;
