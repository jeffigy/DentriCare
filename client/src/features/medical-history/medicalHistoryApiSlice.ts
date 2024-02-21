import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { MedicalHistory } from "types/MedicalHistory";

const medicalHistoryAdapter = createEntityAdapter({
  sortComparer: (a: MedicalHistory, b: MedicalHistory) =>
    b.createdAt.localeCompare(a.createdAt),
});

const initialState = medicalHistoryAdapter.getInitialState();

export const medicalHistoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMedicalHistories: builder.query({
      query: () => ({
        url: "/medical-history",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: MedicalHistory[]) => {
        const loadedMedicalHistories = responseData.map((history) => {
          history.id = String(history._id);
          return history;
        });
        return medicalHistoryAdapter.addMany(
          initialState,
          loadedMedicalHistories
        );
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "MedicalHistory" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({
              type: "MedicalHistory" as const,
              id,
            })),
          ];
        } else {
          return [{ type: "MedicalHistory" as const, id: "LIST" as const }];
        }
      },
    }),

    getMedicalHistoriesByPatientId: builder.query({
      query: (patientId) => ({
        url: `/medical-history/${patientId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: MedicalHistory[]) => {
        const loadedMedicalHistories = responseData.map((history) => {
          history.id = String(history._id);
          return history;
        });
        return medicalHistoryAdapter.addMany(
          initialState,
          loadedMedicalHistories
        );
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "MedicalHistory" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({
              type: "MedicalHistory" as const,
              id,
            })),
          ];
        } else {
          return [{ type: "MedicalHistory" as const, id: "LIST" as const }];
        }
      },
    }),

    addNewMedicalHistory: builder.mutation({
      query: (initialData) => ({
        url: "/medical-history",
        method: "POST",
        body: {
          ...initialData,
        },
      }),
      invalidatesTags: [
        { type: "MedicalHistory" as const, id: "LIST" as const },
      ],
    }),

    updateMedicalHistory: builder.mutation({
      query: (initialData) => ({
        url: "/medical-history",
        method: "PATCH",
        body: {
          ...initialData,
        },
      }),
      invalidatesTags: (arg) => [
        { type: "MedicalHistory" as const, id: arg.id },
      ],
    }),

    deleteMedicalHistory: builder.mutation({
      query: ({ id }) => ({
        url: `/medical-history`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [
        { type: "MedicalHistory" as const, id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetMedicalHistoriesQuery,
  useGetMedicalHistoriesByPatientIdQuery,
  useAddNewMedicalHistoryMutation,
  useUpdateMedicalHistoryMutation,
  useDeleteMedicalHistoryMutation,
} = medicalHistoriesApiSlice;

export const selectMedicalHistoriesResult =
  medicalHistoriesApiSlice.endpoints.getMedicalHistories.select({});

const selectMedicalHitoriesData = createSelector(
  selectMedicalHistoriesResult,
  (medicalHistoriesResult) => medicalHistoriesResult?.data
);

export const {
  selectAll: selectAllMedicalHistories,
  selectById: selectMedicalHistoryById,
  selectIds: selectMedicalHistoryIds,
} = medicalHistoryAdapter.getSelectors(
  (state: RootState) => selectMedicalHitoriesData(state) ?? initialState
);
