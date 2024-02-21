import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { Procedure } from "types/Procedure";

const proceduresAdapter = createEntityAdapter({});

const initialState = proceduresAdapter.getInitialState();

export const proceduresApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProcedures: builder.query({
      query: () => ({
        url: "/procedures",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Procedure[]) => {
        const loadedProcedures = responseData.map((procedure) => {
          procedure.id = String(procedure._id);
          return procedure;
        });
        return proceduresAdapter.setAll(initialState, loadedProcedures);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Procedure" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({ type: "Procedure" as const, id })),
          ];
        } else {
          return [{ type: "Procedure" as const, id: "LIST" as const }];
        }
      },
    }),
    addNewProcedure: builder.mutation({
      query: (initialProcedureData) => ({
        url: "/procedures",
        method: "POST",
        body: {
          ...initialProcedureData,
        },
      }),
      invalidatesTags: [{ type: "Procedure" as const, id: "LIST" as const }],
    }),
    updateProcedure: builder.mutation({
      query: (initialProcedureData) => ({
        url: "/procedures",
        method: "PATCH",
        body: {
          ...initialProcedureData,
        },
      }),
      invalidatesTags: (arg) => [{ type: "Procedure" as const, id: arg.id }],
    }),
    deleteProcedure: builder.mutation({
      query: ({ id }) => ({
        url: `/procedures`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "Procedure" as const, id: arg.id }],
    }),
  }),
});

export const {
  useGetProceduresQuery,
  useAddNewProcedureMutation,
  useUpdateProcedureMutation,
  useDeleteProcedureMutation,
} = proceduresApiSlice;

export const selectProceduresResult =
  proceduresApiSlice.endpoints.getProcedures.select({});

const selectProceduresData = createSelector(
  selectProceduresResult,
  (proceduresResult) => proceduresResult?.data
);

export const {
  selectAll: selectAllProcedures,
  selectById: selectProcedureById,
  selectIds: selectProcedureIds,
} = proceduresAdapter.getSelectors(
  (state: RootState) => selectProceduresData(state) ?? initialState
);
