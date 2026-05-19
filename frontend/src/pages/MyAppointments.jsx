import { useEffect, useState } from "react";
import api from "../services/api";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border border-gray-200 rounded-lg p-5"
            >
              <p><strong>Name:</strong> {appointment.customer_name}</p>
              <p><strong>Service:</strong>{" "}{appointment.service?.name || "N/A"}</p>
              <p><strong>Date:</strong> {appointment.appointment_date}</p>
              <p><strong>Time:</strong> {appointment.appointment_time}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`capitalize px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </p>
              <p><strong>Notes:</strong> {appointment.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;