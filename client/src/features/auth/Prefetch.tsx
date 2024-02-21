import { store } from "app/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { patientsApiSlice } from "features/patients/patientsApiSlice";
import { usersApiSlice } from "features/users/usersApiSlice";
import { appointmentsApiSlice } from "features/appointments/appointmentsApiSlice";
import { paymentApiSlice } from "features/payments/paymentApiSlice";
import { proceduresApiSlice } from "features/procedures/proceduresApiSlice";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      patientsApiSlice.util.prefetch("getPatients", "patientsList", {
        force: true,
      })
    );
    store.dispatch(
      appointmentsApiSlice.util.prefetch(
        "getAppointments",
        "appointmentsList",
        {
          force: true,
        }
      )
    );
    store.dispatch(
      paymentApiSlice.util.prefetch("getPaymentsByPatientId", "paymentsList", {
        force: true,
      })
    );

    store.dispatch(
      proceduresApiSlice.util.prefetch("getProcedures", "proceduresList", {
        force: true,
      })
    );
  }, []);
  return <Outlet />;
};
export default Prefetch;
