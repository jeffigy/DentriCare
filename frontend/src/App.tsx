import DashboardLayout from "components/Dashboard/DashboardLayout";
import RootLayout from "components/RootLayout";
import { ROLES } from "config/roles";
import PersistLogin from "features/auth/PersistLogin";
import Prefetch from "features/auth/Prefetch";
import RequireAuth from "features/auth/RequireAuth";
import HomePage from "pages/HomePage";
import LandingPage from "pages/LandingPage";
import LoginPage from "pages/LoginPage";
import EditPatientPage from "pages/Patients/EditPatientPage";
import NewPatientPage from "pages/Patients/NewPatientPage";
import PatientsPage from "pages/Patients/PatientsPage";
import EditUserPage from "pages/Users/EditUserPage";
import NewUserPage from "pages/Users/NewUserPage";
import UsersPage from "pages/Users/UsersPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
        >
          <Route element={<PersistLogin />}>
            <Route element={<Prefetch />}>
              {/* start of dashboard route */}
              <Route path="dash" element={<DashboardLayout />}>
                <Route index element={<LandingPage />} />
                {/* users route */}
                <Route
                  element={
                    <RequireAuth
                      allowedRoles={[ROLES.Admin, ROLES.SuperAdmin]}
                    />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersPage />} />
                    <Route path="new" element={<NewUserPage />} />
                    <Route path=":id" element={<EditUserPage />} />
                  </Route>
                </Route>
                {/* patients route */}
                <Route path="patients">
                  <Route index element={<PatientsPage />} />
                  <Route path="new" element={<NewPatientPage />} />
                  <Route path=":id" element={<EditPatientPage />} />
                </Route>
              </Route>
              {/* end of dashboard route */}
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
