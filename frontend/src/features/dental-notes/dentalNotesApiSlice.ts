import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { DentalNote } from "types/DentalNote";

const dentalNotesAdapter = createEntityAdapter({
  sortComparer: (a: DentalNote, b: DentalNote) =>
    b.createdAt.localeCompare(a.createdAt),
});
const initialState = dentalNotesAdapter.getInitialState();

export const dentalNotesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDentalNotes: builder.query({
      query: () => ({
        url: "/dental-notes",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: DentalNote[]) => {
        const loadedDentalNotes = responseData.map((dentalNote) => {
          dentalNote.id = String(dentalNote._id);
          return dentalNote;
        });
        return dentalNotesAdapter.addMany(initialState, loadedDentalNotes);
      },

      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "DentalNote" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({ type: "DentalNote" as const, id })),
          ];
        } else {
          return [{ type: "DentalNote" as const, id: "LIST" as const }];
        }
      },
    }),

    addNewDentalNote: builder.mutation({
      query: (initialDentalNoteData) => ({
        url: "/dental-notes",
        method: "POST",
        body: {
          ...initialDentalNoteData,
        },
      }),
      invalidatesTags: [{ type: "DentalNote" as const, id: "LIST" as const }],
    }),
    updateDentalNote: builder.mutation({
      query: (initialDentalNoteData) => ({
        url: "/dental-notes",
        method: "PATCH",
        body: {
          ...initialDentalNoteData,
        },
      }),
      invalidatesTags: (arg) => [{ type: "DentalNote" as const, id: arg.id }],
    }),
    deleteDentalNote: builder.mutation({
      query: ({ id }) => ({
        url: `/dental-notes`,
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (arg) => [{ type: "DentalNote" as const, id: arg.id }],
    }),
  }),
});

export const {
  useGetDentalNotesQuery,
  useAddNewDentalNoteMutation,
  useUpdateDentalNoteMutation,
  useDeleteDentalNoteMutation,
} = dentalNotesApiSlice;

export const selectDentalNotesResult =
  dentalNotesApiSlice.endpoints.getDentalNotes.select(undefined);

const selectDentalNotesData = createSelector(
  selectDentalNotesResult,
  (dentalNotesResult) => dentalNotesResult?.data
);

export const {
  selectAll: selectAllDentalNotes,
  selectById: selectDentalNoteById,
  selectIds: selectDentalNoteIds,
} = dentalNotesAdapter.getSelectors(
  (state: RootState) => selectDentalNotesData(state) ?? initialState
);
