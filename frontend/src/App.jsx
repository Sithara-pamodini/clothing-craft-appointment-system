import { Routes, Route } from "react-router-dom";
import Services from "./pages/Services";
import AppointmentForm from "./pages/AppointmentForm";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAppointments from "./pages/AdminAppointments";
import AdminServices from "./pages/AdminServices";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import EditAppointment from "./pages/EditAppointment";
import AdminCustomers from "./pages/AdminCustomers";
import MyAppointments from "./pages/MyAppointments";
import AddAppointment from "./pages/AddAppointment";
import EditMyAppointment from "./pages/EditMyAppointment";
import RequestRefund from "./pages/RequestRefund";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Services />} />
              <Route path="/book-appointment" element={<AppointmentForm />} />
              <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/appointments" element={<ProtectedRoute adminOnly={true}><AdminAppointments /></ProtectedRoute>} />
              <Route path="/admin/services" element={<ProtectedRoute adminOnly={true}><AdminServices /></ProtectedRoute>} />
              <Route path="/admin/services/add" element={<ProtectedRoute adminOnly={true}><AddService /></ProtectedRoute>} />
              <Route path="/admin/services/edit/:id" element={<ProtectedRoute adminOnly={true}><EditService /></ProtectedRoute>} />
              <Route path="/admin/appointments/edit/:id" element={<ProtectedRoute adminOnly={true}><EditAppointment /></ProtectedRoute>} />
              <Route path="/admin/customers" element={<ProtectedRoute adminOnly={true}><AdminCustomers /></ProtectedRoute>} />
              <Route path="/my-appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
              <Route path="/admin/appointments/add" element={<ProtectedRoute adminOnly={true}><AddAppointment /></ProtectedRoute>} />
              <Route path="/my-appointments/edit/:id" element={<ProtectedRoute><EditMyAppointment /></ProtectedRoute>} />
              <Route path="/my-appointments/refund/:id" element={<ProtectedRoute><RequestRefund /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute adminOnly={true}><Reports /></ProtectedRoute>} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;