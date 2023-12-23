import { store } from "app/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { patientsApiSlice } from "features/patients/patientsApiSlice";
import { usersApiSlice } from "features/users/usersApiSlice";

const Prefetch = () => {
  useEffect(() => {
    const patients = store.dispatch(
      patientsApiSlice.endpoints.getPatients.initiate(undefined)
    );
    const users = store.dispatch(
      usersApiSlice.endpoints.getUsers.initiate(undefined)
    );
    return () => {
      console.log("unsubscribing");
      patients.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return <Outlet />;
};
export default Prefetch;
