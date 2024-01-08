import { store } from "app/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { patientsApiSlice } from "features/patients/patientsApiSlice";
import { usersApiSlice } from "features/users/usersApiSlice";

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
  }, []);
  return <Outlet />;
};
export default Prefetch;
