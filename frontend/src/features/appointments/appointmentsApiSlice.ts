import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { Appointment } from "types/Appointment";

const appointmentAdapter = createEntityAdapter({
  sortComparer: (a: Appointment, b: Appointment) =>
    b.createdAt.localeCompare(a.createdAt),
});

const initialState = appointmentAdapter.getInitialState();

export const appointmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => ({
        url: "/appointments",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Appointment[]) => {
        const loadedAppointments = responseData.map((appointment) => {
          appointment.id = String(appointment._id);
          return appointment;
        });
        return appointmentAdapter.addMany(initialState, loadedAppointments);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Appointment" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({ type: "Appointment" as const, id })),
          ];
        } else {
          return [{ type: "Appointment" as const, id: "LIST" as const }];
        }
      },
    }),

    getAppointmentsByPatientId: builder.query({
      query: (patientId) => ({
        url: `/appointments/${patientId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (responseData: Appointment[]) => {
        const loadedAppointments = responseData.map((appointment) => {
          appointment.id = String(appointment._id);
          return appointment;
        });
        return appointmentAdapter.addMany(initialState, loadedAppointments);
      },

      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Appointment" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({ type: "Appointment" as const, id })),
          ];
        } else {
          return [{ type: "Appointment" as const, id: "LIST" as const }];
        }
      },
    }),

    addNewAppointment: builder.mutation({
      query: (initialAppointmentData) => ({
        url: "/appointments",
        method: "POST",
        body: {
          ...initialAppointmentData,
        },
      }),
      invalidatesTags: [{ type: "Appointment" as const, id: "LIST" as const }],
    }),

    updateAppointment: builder.mutation({
      query: (initialAppointmentData) => ({
        url: "/appointments",
        method: "PATCH",
        body: {
          ...initialAppointmentData,
        },
      }),
      invalidatesTags: (arg) => [{ type: "Appointment" as const, id: arg.id }],
    }),

    deleteAppointment: builder.mutation({
      query: ({ id }) => ({
        url: `/appointments`,
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (arg) => [{ type: "Appointment" as const, id: arg.id }],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentsByPatientIdQuery,
  useAddNewAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentsApiSlice;

export const selectAppointsResult =
  appointmentsApiSlice.endpoints.getAppointments.select({});

const selectAppointmentsData = createSelector(
  selectAppointsResult,
  (appointmentsResult) => appointmentsResult?.data
);

export const {
  selectAll: selectAllAppointments,
  selectById: selectAppointmentById,
  selectIds: selectAppointmentIds,
} = appointmentAdapter.getSelectors(
  (state: RootState) => selectAppointmentsData(state) ?? initialState
);
