import Layout from "components/Dashboard/Layout";
import RootLayout from "components/RootLayout";
import { ROLES } from "config/roles";
import PersistLogin from "features/auth/PersistLogin";
import Prefetch from "features/auth/Prefetch";
import RequireAuth from "features/auth/RequireAuth";
import AppointmentsPage from "pages/Appointments/AppointmentsPage";
import FinancesPage from "pages/Finances/FinancesPage";
import HomePage from "pages/HomePage";
import LandingPage from "pages/LandingPage";
import LoginPage from "pages/LoginPage";
import DentalNotesPage from "pages/Patients/DentalNotes/DentalNotesPage";
import NewDentalNotePage from "pages/Patients/DentalNotes/NewDentalNotePage";
import EditPatientPage from "pages/Patients/EditPatientPage";
import MedicalHistoryPage from "pages/Patients/MedicalHistory/MedicalHistoryPage";
import NewPatientPage from "pages/Patients/NewPatientPage";
import PatientAppointmentsPage from "pages/Patients/PatientAppointments/PatientAppointmentsPage";
import PatientDetailsPage from "pages/Patients/PatientDetailsPage";
import PatientPaymentsPage from "pages/Patients/PatientPayments/PatientPaymentsPage";
import PatientsPage from "pages/Patients/PatientsPage";
import PhotosPage from "pages/Patients/Photos/PhotosPage";
import TreatmentPlansPage from "pages/Patients/TreatmentPlans/TreatmentPlansPage";
import EditProcedurePage from "pages/Procedures/EditProcedurePage";
import NewProcedurePage from "pages/Procedures/NewProcedurePage";
import ProceduresPage from "pages/Procedures/ProceduresPage";
import EditUserPage from "pages/Users/EditUserPage";
import NewUserPage from "pages/Users/NewUserPage";
import UsersPage from "pages/Users/UsersPage";
import { Route, Routes } from "react-router-dom";
import "style.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              {/* start of dashboard route */}
              <Route path="dash" element={<Layout />}>
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
                  <Route path=":id">
                    <Route index element={<PatientDetailsPage />} />
                    <Route path="edit" element={<EditPatientPage />} />
                    {/* dental notes route */}
                    <Route path="dental-notes">
                      <Route index element={<DentalNotesPage />} />
                      <Route path="new" element={<NewDentalNotePage />} />
                    </Route>
                    {/* medical history route */}
                    <Route path="medical-history">
                      <Route index element={<MedicalHistoryPage />} />
                    </Route>
                    {/* patient appointments route */}
                    <Route path="patient-appointments">
                      <Route index element={<PatientAppointmentsPage />} />
                    </Route>
                    {/* patient payments routes */}
                    <Route path="patient-payments">
                      <Route index element={<PatientPaymentsPage />} />
                    </Route>
                    {/* photos route */}
                    <Route path="photos">
                      <Route index element={<PhotosPage />} />
                    </Route>
                    {/* treatment-plans route */}
                    <Route path="treatment-plans">
                      <Route index element={<TreatmentPlansPage />} />
                    </Route>
                  </Route>
                </Route>
                {/* Appointments route */}
                <Route path="appointments">
                  <Route index element={<AppointmentsPage />} />
                </Route>
                {/* procedures route */}
                <Route path="procedures">
                  <Route index element={<ProceduresPage />} />
                  <Route path="new" element={<NewProcedurePage />} />
                  <Route path=":id" element={<EditProcedurePage />} />
                </Route>
                {/* finances */}
                <Route path="finances">
                  <Route index element={<FinancesPage />} />
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
