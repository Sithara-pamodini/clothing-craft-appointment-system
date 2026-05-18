import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = () => {
    api
      .get("/appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error loading appointments:", error);
      });
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) {
      return;
    }

    try {
      await api.delete(`/appointments/${id}`);
      alert("Appointment deleted successfully!");
      loadAppointments();
    } catch (error) {
      console.error(error);
      alert("Failed to delete appointment.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-zinc-900 text-white">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Notes</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-t">
                  <td className="p-3">{appointment.customer_name}</td>
                  <td className="p-3">{appointment.customer_phone}</td>
                  <td className="p-3">{appointment.appointment_date}</td>
                  <td className="p-3">{appointment.appointment_time}</td>
                  <td className="p-3 capitalize">{appointment.status}</td>
                  <td className="p-3">{appointment.notes}</td>
                  <td className="p-3">
                    <Link
                      to={`/admin/appointments/edit/${appointment.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminAppointments;