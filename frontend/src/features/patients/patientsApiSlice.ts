import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";

export type Patient = {
  [x: string]: string | number;
  id: string;
  fname: string;
  mname: string;
  lname: string;
  bday: number;
  address: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
  patient: string;
};
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
      keepUnusedDataFor: 5,
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
  }),
});

export const { useGetPatientsQuery } = patientsApiSlice;

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
