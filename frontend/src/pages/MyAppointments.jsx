import { useEffect, useState } from "react";
import api from "../services/api";

function MyAppointments() {
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
              <p><strong>Date:</strong> {appointment.appointment_date}</p>
              <p><strong>Time:</strong> {appointment.appointment_time}</p>
              <p><strong>Notes:</strong> {appointment.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;