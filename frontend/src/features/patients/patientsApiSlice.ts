import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { Patient } from "types/Patient";

const patientsAdapter = createEntityAdapter({});

const initialState = patientsAdapter.getInitialState();

export const patientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => ({
        url: "/patients",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Patient[]) => {
        const loadedPatients = responseData.map((patient) => {
          patient.id = String(patient._id);
          return patient;
        });
        return patientsAdapter.setAll(initialState, loadedPatients);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Patient" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({ type: "Patient" as const, id })),
          ];
        } else {
          return [{ type: "Patient" as const, id: "LIST" as const }];
        }
      },
    }),
    addNewPatient: builder.mutation({
      query: (initialPatientData) => ({
        url: "/patients",
        method: "POST",
        body: {
          ...initialPatientData,
        },
      }),
      invalidatesTags: [{ type: "Patient" as const, id: "LIST" as const }],
    }),
    updatePatient: builder.mutation({
      query: (initialPatientData) => ({
        url: "/patients",
        method: "PATCH",
        body: {
          ...initialPatientData,
        },
      }),
      invalidatesTags: (arg) => [{ type: "Patient" as const, id: arg.id }],
    }),
    deletePatient: builder.mutation({
      query: ({ id }) => ({
        url: `/patients`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "Patient" as const, id: arg.id }],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useAddNewPatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientsApiSlice;

export const selectpatientsResult =
  patientsApiSlice.endpoints.getPatients.select(undefined);

const selectPatientsData = createSelector(
  selectpatientsResult,
  (patientsResult) => patientsResult?.data
);

export const {
  selectAll: selectAllPatients,
  selectById: selectPatientById,
  selectIds: selectPatientIds,
} = patientsAdapter.getSelectors(
  (state: RootState) => selectPatientsData(state) ?? initialState
);
