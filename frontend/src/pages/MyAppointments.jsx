import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

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

  const loadAppointments = () => {
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
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleCancel = async (appointment) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await api.put(`/appointments/${appointment.id}`, {
        service_id: appointment.service_id,
        customer_name: appointment.customer_name,
        customer_email: appointment.customer_email,
        customer_phone: appointment.customer_phone,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        notes: appointment.notes,
        fabric_details: appointment.fabric_details,
        design_preferences: appointment.design_preferences,
        alteration_details: appointment.alteration_details,
        status: "cancelled",
        payment_status: appointment.payment_status || "unpaid",
        refund_status: appointment.refund_status || "",
      });

      alert("Appointment cancelled successfully!");
      loadAppointments();
    } catch (error) {
      console.error(error);
      alert("Failed to cancel appointment.");
    }
  };

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
                  {appointment.status || "pending"}
                </span>
              </div>

              <div className="text-sm space-y-2">
                <p>
                  <strong>Date:</strong> {appointment.appointment_date}
                </p>

                <p>
                  <strong>Time:</strong> {appointment.appointment_time}
                </p>

                <p>
                  <strong>Payment:</strong> {appointment.payment_status || "unpaid"}
                </p>

                <p>
                  <strong>Refund:</strong> {appointment.refund_status || "N/A"}
                </p>

                <p className="break-words">
                  <strong>Notes:</strong> {appointment.notes || "N/A"}
                </p>

                <p className="break-words">
                  <strong>Fabric Details:</strong>{" "}
                  {appointment.fabric_details || "N/A"}
                </p>

                <p className="break-words">
                  <strong>Design Preferences:</strong>{" "}
                  {appointment.design_preferences || "N/A"}
                </p>

                <p className="break-words">
                  <strong>Alteration Details:</strong>{" "}
                  {appointment.alteration_details || "N/A"}
                </p>
              </div>

              {appointment.status !== "cancelled" &&
                appointment.status !== "completed" && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      to={`/my-appointments/edit/${appointment.id}`}
                      className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 text-center"
                    >
                      Edit Appointment
                    </Link>

                    <button
                      onClick={() => handleCancel(appointment)}
                      className="w-full bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}

              {appointment.status === "cancelled" &&
                appointment.payment_status === "paid" &&
                !appointment.refund_status && (
                  <Link
                    to={`/my-appointments/refund/${appointment.id}`}
                    className="mt-4 block w-full bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 text-center"
                  >
                    Request Refund
                  </Link>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;