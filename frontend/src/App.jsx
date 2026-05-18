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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/book-appointment" element={<AppointmentForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/appointments" element={
            <ProtectedRoute adminOnly={true}>
              <AdminAppointments />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/services" element={
            <ProtectedRoute adminOnly={true}>
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/services/add" element={
            <ProtectedRoute adminOnly={true}  >
              <AddService />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/services/edit/:id" element={
            <ProtectedRoute adminOnly={true}>
              <EditService />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/appointments/edit/:id" element={
            <ProtectedRoute adminOnly={true}>
              <EditAppointment />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/customers" element={
            <ProtectedRoute adminOnly={true}>
              <AdminCustomers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;