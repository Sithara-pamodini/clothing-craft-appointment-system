import { useEffect, useState } from "react";
import api from "../services/api";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api
      .get("/appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error loading appointments:", error);
      });
  }, []);

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
                <th className="p-3 text-left">Notes</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-t">
                  <td className="p-3">{appointment.customer_name}</td>
                  <td className="p-3">{appointment.customer_phone}</td>
                  <td className="p-3">{appointment.appointment_date}</td>
                  <td className="p-3">{appointment.appointment_time}</td>
                  <td className="p-3">{appointment.notes}</td>
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