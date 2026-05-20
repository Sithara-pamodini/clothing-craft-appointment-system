import { useEffect, useState } from "react";
import api from "../services/api";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading appointments:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        My Appointments
      </h1>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-bold text-lg break-words">
                    {appointment.customer_name}
                  </h3>

                  <p className="text-sm text-gray-600 break-words">
                    {appointment.service?.name || "N/A"}
                  </p>
                </div>

                <span
                  className={`capitalize px-3 py-1 rounded-full text-sm w-fit whitespace-nowrap ${getStatusBadgeClass(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="text-sm space-y-2">
                <p>
                  <strong>Date:</strong> {appointment.appointment_date}
                </p>

                <p>
                  <strong>Time:</strong> {appointment.appointment_time}
                </p>

                <p className="break-words">
                  <strong>Notes:</strong> {appointment.notes || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;