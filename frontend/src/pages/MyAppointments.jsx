import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  CreditCard,
  RefreshCcw,
  FileText,
  Shirt,
  Pencil,
  XCircle,
} from "lucide-react";

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

  const getPaymentBadgeClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRefundBadgeClass = (status) => {
    switch (status) {
      case "requested":
        return "bg-purple-100 text-purple-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
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
    <div className="min-h-screen bg-[#fffaf7] text-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-18 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-pink-700 font-semibold mb-4">
            Nilu Fashion
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            My Appointments
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            View your clothing service appointments, check current progress,
            edit booking details, cancel appointments, or request a refund when
            eligible.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {loading ? (
          <div className="bg-white rounded-3xl shadow-sm border p-10 text-center">
            <p className="text-gray-600 text-lg">Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border p-8 md:p-12 text-center">
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mb-5">
                <CalendarDays size={38} className="text-pink-700" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
                No Appointments Found
              </h2>

              <p className="text-gray-500 text-center max-w-md mb-6">
                You have not booked any appointments yet. Choose a tailoring,
                fitting, or alteration service and schedule your visit.
              </p>

              <Link
                to="/services"
                className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
              >
                Browse Services
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="uppercase tracking-[0.25em] text-sm text-pink-700 font-semibold mb-2">
                  Appointment History
                </p>

                <h2 className="text-3xl md:text-4xl font-bold">
                  Your Bookings
                </h2>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
              >
                Book New Appointment
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-3xl shadow-sm border hover:shadow-lg transition overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 p-6 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <p className="text-sm text-pink-700 font-semibold mb-2">
                          Appointment #{appointment.id}
                        </p>

                        <h3 className="font-bold text-2xl break-words">
                          {appointment.service?.name || "N/A"}
                        </h3>

                        <p className="text-gray-600 mt-1 break-words">
                          {appointment.customer_name}
                        </p>
                      </div>

                      <span
                        className={`capitalize px-4 py-2 rounded-full text-sm font-semibold w-fit whitespace-nowrap ${getStatusBadgeClass(
                          appointment.status
                        )}`}
                      >
                        {appointment.status || "pending"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3 bg-[#fffaf7] rounded-2xl p-4 border">
                        <CalendarDays
                          size={20}
                          className="text-pink-700 mt-0.5"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-semibold">
                            {appointment.appointment_date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-[#fffaf7] rounded-2xl p-4 border">
                        <Clock size={20} className="text-pink-700 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-semibold">
                            {appointment.appointment_time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-[#fffaf7] rounded-2xl p-4 border">
                        <CreditCard
                          size={20}
                          className="text-pink-700 mt-0.5"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Payment</p>
                          <span
                            className={`capitalize inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadgeClass(
                              appointment.payment_status || "unpaid"
                            )}`}
                          >
                            {appointment.payment_status || "unpaid"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-[#fffaf7] rounded-2xl p-4 border">
                        <RefreshCcw
                          size={20}
                          className="text-pink-700 mt-0.5"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Refund</p>
                          <span
                            className={`capitalize inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getRefundBadgeClass(
                              appointment.refund_status || "N/A"
                            )}`}
                          >
                            {appointment.refund_status || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm md:text-base">
                      <div className="border rounded-2xl p-4">
                        <div className="flex items-center gap-2 font-bold mb-2">
                          <FileText size={18} className="text-pink-700" />
                          Notes
                        </div>
                        <p className="text-gray-600 break-words">
                          {appointment.notes || "N/A"}
                        </p>
                      </div>

                      <div className="border rounded-2xl p-4">
                        <div className="flex items-center gap-2 font-bold mb-2">
                          <Shirt size={18} className="text-pink-700" />
                          Fabric Details
                        </div>
                        <p className="text-gray-600 break-words">
                          {appointment.fabric_details || "N/A"}
                        </p>
                      </div>

                      <div className="border rounded-2xl p-4">
                        <div className="flex items-center gap-2 font-bold mb-2">
                          <FileText size={18} className="text-pink-700" />
                          Design Preferences
                        </div>
                        <p className="text-gray-600 break-words">
                          {appointment.design_preferences || "N/A"}
                        </p>
                      </div>

                      <div className="border rounded-2xl p-4">
                        <div className="flex items-center gap-2 font-bold mb-2">
                          <ScissorsIcon />
                          Alteration Details
                        </div>
                        <p className="text-gray-600 break-words">
                          {appointment.alteration_details || "N/A"}
                        </p>
                      </div>
                    </div>

                    {appointment.status !== "cancelled" &&
                      appointment.status !== "completed" && (
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Link
                            to={`/my-appointments/edit/${appointment.id}`}
                            className="inline-flex items-center justify-center gap-2 w-full bg-gray-900 text-white rounded-full px-4 py-3 hover:bg-gray-700 text-center font-semibold transition"
                          >
                            <Pencil size={17} />
                            Edit Appointment
                          </Link>

                          <button
                            onClick={() => handleCancel(appointment)}
                            className="inline-flex items-center justify-center gap-2 w-full bg-red-600 text-white rounded-full px-4 py-3 hover:bg-red-700 font-semibold transition"
                          >
                            <XCircle size={18} />
                            Cancel Appointment
                          </button>
                        </div>
                      )}

                    {appointment.status === "cancelled" &&
                      appointment.payment_status === "paid" &&
                      !appointment.refund_status && (
                        <Link
                          to={`/my-appointments/refund/${appointment.id}`}
                          className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-purple-600 text-white rounded-full px-4 py-3 hover:bg-purple-700 text-center font-semibold transition"
                        >
                          <RefreshCcw size={18} />
                          Request Refund
                        </Link>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function ScissorsIcon() {
  return (
    <svg
      className="text-pink-700"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

export default MyAppointments;