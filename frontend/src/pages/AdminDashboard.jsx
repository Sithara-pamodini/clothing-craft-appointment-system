import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    appointments: 0,
    services: 0,
    customers: 0,
    availableStaff: 0,
    busyStaff: 0,
    unavailableStaff: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const appointmentsResponse = await api.get("/appointments");
        const servicesResponse = await api.get("/services");
        const usersResponse = await api.get("/users");

        const customers = usersResponse.data.filter(
          (user) => user.role === "customer"
        );

        const staffUsers = usersResponse.data.filter(
          (user) => user.role === "admin"
        );

        setStats({
          appointments: appointmentsResponse.data.length,
          services: servicesResponse.data.length,
          customers: customers.length,
          availableStaff: staffUsers.filter(
            (user) => (user.availability_status || "available") === "available"
          ).length,
          busyStaff: staffUsers.filter(
            (user) => user.availability_status === "busy"
          ).length,
          unavailableStaff: staffUsers.filter(
            (user) => user.availability_status === "unavailable"
          ).length,
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Admin Dashboard
      </h1>

      <p className="text-gray-600 mb-2">
        Welcome back, {user?.name}
      </p>

      <h2 className="text-xl font-semibold">
        {user?.name}
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 text-white rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold">Appointments</h3>
          <p className="mt-2 text-2xl font-bold">{stats.appointments}</p>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold">Services</h3>
          <p className="mt-2 text-2xl font-bold">{stats.services}</p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold">Customers</h3>
          <p className="mt-2 text-2xl font-bold">{stats.customers}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Staff Availability</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-green-200 bg-green-50 rounded-xl p-6 text-center">
            <h3 className="text-lg font-bold text-green-800">Available</h3>
            <p className="mt-2 text-2xl font-bold text-green-800">
              {stats.availableStaff}
            </p>
          </div>

          <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-6 text-center">
            <h3 className="text-lg font-bold text-yellow-800">Busy</h3>
            <p className="mt-2 text-2xl font-bold text-yellow-800">
              {stats.busyStaff}
            </p>
          </div>

          <div className="border border-red-200 bg-red-50 rounded-xl p-6 text-center">
            <h3 className="text-lg font-bold text-red-800">Unavailable</h3>
            <p className="mt-2 text-2xl font-bold text-red-800">
              {stats.unavailableStaff}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          to="/admin/appointments"
          className="inline-block bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-700 text-center"
        >
          Manage Appointments
        </Link>

        <Link
          to="/admin/services"
          className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 text-center"
        >
          Manage Services
        </Link>

        <Link
          to="/admin/customers"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-center"
        >
          Manage Customers
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;