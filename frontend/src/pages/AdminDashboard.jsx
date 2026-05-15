import { Link } from "react-router-dom";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <p className="text-gray-600 mb-2">Welcome back,</p>

      <h2 className="text-xl font-semibold">{user?.name}</h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 text-white rounded-xl p-6">
          <h3 className="text-lg font-bold">Appointments</h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-6">
          <h3 className="text-lg font-bold">Services</h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-6">
          <h3 className="text-lg font-bold">Customers</h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/admin/appointments"
          className="inline-block bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-700"
        >
          Manage Appointments
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;