import DashboardLayout from "components/Dashboard/DashboardLayout";
import RootLayout from "components/RootLayout";
import HomePage from "pages/HomePage";
import LandingPage from "pages/LandingPage";

import LoginPage from "pages/LoginPage";
import PatientsPage from "pages/Patients/PatientsPage";
import UsersPage from "pages/Users/UsersPage";

import React from "react";
import { Route, Routes } from "react-router-dom";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        {/* start of dashboard route */}
        <Route path="dash" element={<DashboardLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="users">
            <Route index element={<UsersPage />} />
          </Route>
          <Route path="patients">
            <Route index element={<PatientsPage />} />
          </Route>
        </Route>
        {/* end of dashboard route */}
      </Route>
    </Routes>
  );
};
export default App;
