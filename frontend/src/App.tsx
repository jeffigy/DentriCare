import Layout from "components/Dashboard/Layout";
import RootLayout from "components/RootLayout";
import { ROLES } from "config/roles";
import PersistLogin from "features/auth/PersistLogin";
import Prefetch from "features/auth/Prefetch";
import RequireAuth from "features/auth/RequireAuth";
import AppointmentsPage from "pages/Appointments/AppointmentsPage";
import EditAppointmentPage from "pages/Appointments/EditAppointmentPage";
import NewAppointmentPage from "pages/Appointments/NewAppointmentPage";
import FinancesPage from "pages/Finances/FinancesPage";
import HomePage from "pages/HomePage";
import LandingPage from "pages/LandingPage";
import LoginPage from "pages/LoginPage";
import DentalNotesPage from "pages/Patients/DentalNotes/DentalNotesPage";
import EditDentalNotePage from "pages/Patients/DentalNotes/EditDentalNotePage";
import NewDentalNotePage from "pages/Patients/DentalNotes/NewDentalNotePage";
import EditPatientPage from "pages/Patients/EditPatientPage";
import MedicalHistoryPage from "pages/Patients/MedicalHistory/MedicalHistoryPage";
import NewPatientPage from "pages/Patients/NewPatientPage";
import PatientAppointmentsPage from "pages/Patients/PatientAppointments/PatientAppointmentsPage";
import PatientDetailsPage from "pages/Patients/PatientDetailsPage";
import PaymentsPage from "pages/Patients/Payments/PaymentsPage";
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
import NewPaymentPage from "pages/Patients/Payments/NewPaymentPage";
import EditPaymentPage from "pages/Patients/Payments/EditPaymentPage";
import "style.css";
import PaymentDetailsPage from "pages/Patients/Payments/PaymentDetailsPage";
import NewInstallmentPaymentPage from "pages/Patients/Payments/InstallmentPayment/NewInstallmentPaymentPage";
import EditInstallmentPaymentPage from "pages/Patients/Payments/InstallmentPayment/EditInstallmentPaymentPage";
import NewMedicalHistoryPage from "pages/Patients/MedicalHistory/NewMedicalHistoryPage";
import EditMedicalHistoryPage from "pages/Patients/MedicalHistory/EditMedicalHistoryPage";

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
                      <Route path=":noteId" element={<EditDentalNotePage />} />
                    </Route>
                    {/* medical history route */}
                    <Route path="medical-history">
                      <Route index element={<MedicalHistoryPage />} />
                      <Route path="new" element={<NewMedicalHistoryPage />} />
                      <Route
                        path=":historyId"
                        element={<EditMedicalHistoryPage />}
                      />
                    </Route>
                    {/* patient appointments route */}
                    <Route path="patient-appointments">
                      <Route index element={<PatientAppointmentsPage />} />
                    </Route>
                    {/*payments routes */}
                    <Route path="payments">
                      <Route index element={<PaymentsPage />} />
                      <Route path="new" element={<NewPaymentPage />} />
                      <Route path=":paymentId">
                        <Route index element={<PaymentDetailsPage />} />
                        <Route path="edit" element={<EditPaymentPage />} />
                        <Route path="installment-payment">
                          <Route
                            path="new"
                            element={<NewInstallmentPaymentPage />}
                          />
                          <Route
                            path=":installmentPaymentId"
                            element={<EditInstallmentPaymentPage />}
                          />
                        </Route>
                      </Route>
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
                  <Route path="new" element={<NewAppointmentPage />} />
                  <Route path=":id" element={<EditAppointmentPage />} />
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
