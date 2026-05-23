import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function AdminAppointments() {
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

  const getPaymentBadgeClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
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
    <div className="bg-white rounded-xl shadow-md p-5 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Manage Appointments
        </h1>

        <Link
          to="/admin/appointments/add"
          className="bg-zinc-900 text-white px-5 py-2 rounded-lg hover:bg-zinc-700 text-center"
        >
          Add Appointment
        </Link>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <>
          <div className="hidden xl:block overflow-x-auto">
            <table className="w-full border border-gray-200 table-fixed">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-3 text-left w-[11%]">Customer</th>
                  <th className="p-3 text-left w-[12%]">Service</th>
                  <th className="p-3 text-left w-[10%]">Phone</th>
                  <th className="p-3 text-left w-[10%]">Date</th>
                  <th className="p-3 text-left w-[8%]">Time</th>
                  <th className="p-3 text-left w-[9%]">Status</th>
                  <th className="p-3 text-left w-[9%]">Payment</th>
                  <th className="p-3 text-left w-[23%]">Job Details</th>
                  <th className="p-3 text-left w-[8%]">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-t">
                    <td className="p-3 align-top break-words">
                      <p className="font-medium">{appointment.customer_name}</p>
                      <p className="text-xs text-gray-500">
                        {appointment.customer_email || "No email"}
                      </p>
                    </td>

                    <td className="p-3 align-top break-words">
                      {appointment.service?.name || "N/A"}
                    </td>

                    <td className="p-3 align-top break-words">
                      {appointment.customer_phone}
                    </td>

                    <td className="p-3 align-top break-words">
                      {appointment.appointment_date}
                    </td>

                    <td className="p-3 align-top break-words">
                      {appointment.appointment_time}
                    </td>

                    <td className="p-3 align-top">
                      <span
                        className={`capitalize px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(
                          appointment.status
                        )}`}
                      >
                        {appointment.status || "pending"}
                      </span>
                    </td>

                    <td className="p-3 align-top">
                      <span
                        className={`capitalize px-3 py-1 rounded-full text-sm ${getPaymentBadgeClass(
                          appointment.payment_status
                        )}`}
                      >
                        {appointment.payment_status || "pending"}
                      </span>

                      {appointment.refund_status && (
                        <p className="text-xs text-gray-500 mt-2">
                          Refund: {appointment.refund_status}
                        </p>
                      )}
                    </td>

                    <td className="p-3 align-top break-words text-sm space-y-1">
                      <p>
                        <span className="font-semibold">Notes:</span>{" "}
                        {appointment.notes || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Fabric:</span>{" "}
                        {appointment.fabric_details || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Design:</span>{" "}
                        {appointment.design_preferences || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Alteration:</span>{" "}
                        {appointment.alteration_details || "N/A"}
                      </p>
                    </td>

                    <td className="p-3 align-top">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/appointments/edit/${appointment.id}`}
                          title="Edit Appointment"
                          className="w-9 h-9 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(appointment.id)}
                          title="Delete Appointment"
                          className="w-9 h-9 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="xl:hidden space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-lg">
                      {appointment.customer_name}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {appointment.service?.name || "N/A"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {appointment.customer_email || "No email"}
                    </p>
                  </div>

                  <span
                    className={`capitalize px-3 py-1 rounded-full text-sm whitespace-nowrap ${getStatusBadgeClass(
                      appointment.status
                    )}`}
                  >
                    {appointment.status || "pending"}
                  </span>
                </div>

                <div className="text-sm space-y-1">
                  <p>
                    <strong>Phone:</strong> {appointment.customer_phone}
                  </p>

                  <p>
                    <strong>Date:</strong> {appointment.appointment_date}
                  </p>

                  <p>
                    <strong>Time:</strong> {appointment.appointment_time}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    <span
                      className={`capitalize px-2 py-1 rounded-full text-xs ${getPaymentBadgeClass(
                        appointment.payment_status
                      )}`}
                    >
                      {appointment.payment_status || "pending"}
                    </span>
                  </p>

                  <p>
                    <strong>Refund:</strong>{" "}
                    {appointment.refund_status || "N/A"}
                  </p>

                  <p>
                    <strong>Notes:</strong> {appointment.notes || "N/A"}
                  </p>

                  <p>
                    <strong>Fabric Details:</strong>{" "}
                    {appointment.fabric_details || "N/A"}
                  </p>

                  <p>
                    <strong>Design Preferences:</strong>{" "}
                    {appointment.design_preferences || "N/A"}
                  </p>

                  <p>
                    <strong>Alteration Details:</strong>{" "}
                    {appointment.alteration_details || "N/A"}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/admin/appointments/edit/${appointment.id}`}
                    title="Edit Appointment"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => handleDelete(appointment.id)}
                    title="Delete Appointment"
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminAppointments;