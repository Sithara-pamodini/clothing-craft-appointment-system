import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    appointments: 0,
    services: 0,
    customers: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const appointmentsResponse = await api.get("/appointments");
        const servicesResponse = await api.get("/services");

        setStats({
          appointments: appointmentsResponse.data.length,
          services: servicesResponse.data.length,
          customers: 0,
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-4">
        Admin Dashboard
      </h1>

      <p className="text-gray-600 mb-2">
        Welcome back,
      </p>

      <h2 className="text-xl font-semibold">
        {user?.name}
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 text-white rounded-xl p-6">
          <h3 className="text-lg font-bold">Appointments</h3>
          <p className="mt-2 text-3xl font-bold">
            {stats.appointments}
          </p>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-6">
          <h3 className="text-lg font-bold">Services</h3>
          <p className="mt-2 text-3xl font-bold">
            {stats.services}
          </p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-6">
          <h3 className="text-lg font-bold">Customers</h3>
          <p className="mt-2 text-3xl font-bold">
            {stats.customers}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          to="/admin/appointments"
          className="inline-block bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-700"
        >
          Manage Appointments
        </Link>

        <Link
          to="/admin/services"
          className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
        >
          Manage Services
        </Link>

        <Link
          to="/admin/customers"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Manage Customers
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;