import { Routes, Route } from "react-router-dom";
import Services from "./pages/Services";
import AppointmentForm from "./pages/AppointmentForm";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Register from "./pages/Register";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/book-appointment" element={<AppointmentForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;