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
  Eye,
  X,
} from "lucide-react";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/my-calendar"
                  className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                >
                  My Calendar
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
                >
                  Book New Appointment
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
              {appointments.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="bg-white border rounded-3xl shadow-sm overflow-hidden"
                >
                  <div className="bg-gray-900 text-white px-5 py-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-pink-300 font-bold mb-1">
                        Appointment #{index + 1}
                      </p>

                      <h3 className="text-lg font-bold break-words">
                        {appointment.service?.name || "N/A"}
                      </h3>

                      <p className="text-sm text-gray-300 mt-1 break-words">
                        {appointment.customer_name || "N/A"}
                      </p>
                    </div>

                    <span
                      className={`capitalize px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getStatusBadgeClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status || "pending"}
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-start gap-3 bg-[#fffaf7] border rounded-2xl p-4">
                        <CalendarDays
                          size={18}
                          className="text-pink-700 mt-0.5"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Date & Time</p>
                          <p className="font-semibold">
                            {appointment.appointment_date || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.appointment_time || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 bg-[#fffaf7] border rounded-2xl p-4">
                          <CreditCard
                            size={18}
                            className="text-pink-700 mt-0.5"
                          />
                          <div>
                            <p className="text-sm text-gray-500">Payment</p>
                            <span
                              className={`capitalize inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${getPaymentBadgeClass(
                                appointment.payment_status || "unpaid"
                              )}`}
                            >
                              {appointment.payment_status || "unpaid"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 bg-[#fffaf7] border rounded-2xl p-4">
                          <RefreshCcw
                            size={18}
                            className="text-pink-700 mt-0.5"
                          />
                          <div>
                            <p className="text-sm text-gray-500">Refund</p>
                            <span
                              className={`capitalize inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${getRefundBadgeClass(
                                appointment.refund_status || "N/A"
                              )}`}
                            >
                              {appointment.refund_status || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() =>
                          setSelectedAppointment({
                            ...appointment,
                            display_number: index + 1,
                          })
                        }
                        title="View Details"
                        aria-label="View Details"
                        className="inline-flex items-center justify-center w-11 h-11 bg-pink-700 text-white rounded-full hover:bg-pink-800 transition"
                      >
                        <Eye size={18} />
                      </button>

                      {appointment.status !== "cancelled" &&
                        appointment.status !== "completed" && (
                          <>
                            <Link
                              to={`/my-appointments/edit/${appointment.id}`}
                              title="Edit Appointment"
                              aria-label="Edit Appointment"
                              className="inline-flex items-center justify-center w-11 h-11 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
                            >
                              <Pencil size={18} />
                            </Link>

                            <button
                              onClick={() => handleCancel(appointment)}
                              title="Cancel Appointment"
                              aria-label="Cancel Appointment"
                              className="inline-flex items-center justify-center w-11 h-11 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}

                      {appointment.status === "cancelled" &&
                        appointment.payment_status === "paid" &&
                        !appointment.refund_status && (
                          <Link
                            to={`/my-appointments/refund/${appointment.id}`}
                            title="Request Refund"
                            aria-label="Request Refund"
                            className="inline-flex items-center justify-center w-11 h-11 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                          >
                            <RefreshCcw size={18} />
                          </Link>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:block bg-white rounded-3xl border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-900 text-white">
                    <tr>
                      <th className="px-5 py-4 text-sm font-semibold">No.</th>
                      <th className="px-5 py-4 text-sm font-semibold">
                        Service
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold">
                        Date & Time
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold">
                        Status
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold">
                        Payment
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold">
                        Refund
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {appointments.map((appointment, index) => (
                      <tr
                        key={appointment.id}
                        className="hover:bg-pink-50/60 transition"
                      >
                        <td className="px-5 py-5 align-middle">
                          <span className="font-bold text-pink-700">
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <p className="font-bold text-gray-900">
                            {appointment.service?.name || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.customer_name || "N/A"}
                          </p>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <div className="flex items-start gap-2">
                            <CalendarDays
                              size={17}
                              className="text-pink-700 mt-0.5"
                            />
                            <div>
                              <p className="font-semibold">
                                {appointment.appointment_date || "N/A"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {appointment.appointment_time || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <span
                            className={`capitalize inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(
                              appointment.status
                            )}`}
                          >
                            {appointment.status || "pending"}
                          </span>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <div className="flex items-center gap-2">
                            <CreditCard size={16} className="text-pink-700" />
                            <span
                              className={`capitalize inline-flex px-3 py-1 rounded-full text-xs font-bold ${getPaymentBadgeClass(
                                appointment.payment_status || "unpaid"
                              )}`}
                            >
                              {appointment.payment_status || "unpaid"}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <div className="flex items-center gap-2">
                            <RefreshCcw size={16} className="text-pink-700" />
                            <span
                              className={`capitalize inline-flex px-3 py-1 rounded-full text-xs font-bold ${getRefundBadgeClass(
                                appointment.refund_status || "N/A"
                              )}`}
                            >
                              {appointment.refund_status || "N/A"}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                setSelectedAppointment({
                                  ...appointment,
                                  display_number: index + 1,
                                })
                              }
                              title="View Details"
                              aria-label="View Details"
                              className="inline-flex items-center justify-center w-10 h-10 bg-pink-700 text-white rounded-full hover:bg-pink-800 transition"
                            >
                              <Eye size={17} />
                            </button>

                            {appointment.status !== "cancelled" &&
                              appointment.status !== "completed" && (
                                <>
                                  <Link
                                    to={`/my-appointments/edit/${appointment.id}`}
                                    title="Edit Appointment"
                                    aria-label="Edit Appointment"
                                    className="inline-flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
                                  >
                                    <Pencil size={17} />
                                  </Link>

                                  <button
                                    onClick={() => handleCancel(appointment)}
                                    title="Cancel Appointment"
                                    aria-label="Cancel Appointment"
                                    className="inline-flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                  >
                                    <XCircle size={17} />
                                  </button>
                                </>
                              )}

                            {appointment.status === "cancelled" &&
                              appointment.payment_status === "paid" &&
                              !appointment.refund_status && (
                                <Link
                                  to={`/my-appointments/refund/${appointment.id}`}
                                  title="Request Refund"
                                  aria-label="Request Refund"
                                  className="inline-flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                                >
                                  <RefreshCcw size={17} />
                                </Link>
                              )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>

      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          getStatusBadgeClass={getStatusBadgeClass}
          getPaymentBadgeClass={getPaymentBadgeClass}
          getRefundBadgeClass={getRefundBadgeClass}
        />
      )}
    </div>
  );
}

function AppointmentDetailsModal({
  appointment,
  onClose,
  getStatusBadgeClass,
  getPaymentBadgeClass,
  getRefundBadgeClass,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 px-4 py-6 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-5 rounded-t-3xl flex items-start justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-pink-700 font-semibold mb-2">
              Appointment Details
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Appointment #{appointment.display_number}
            </h2>

            <p className="text-gray-500 mt-1">
              Full booking information for your appointment.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition shrink-0"
            title="Close"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <DetailBox
              icon={<Shirt size={19} />}
              label="Service"
              value={appointment.service?.name || "N/A"}
            />

            <DetailBox
              icon={<CalendarDays size={19} />}
              label="Appointment Date"
              value={appointment.appointment_date || "N/A"}
            />

            <DetailBox
              icon={<Clock size={19} />}
              label="Appointment Time"
              value={appointment.appointment_time || "N/A"}
            />

            <DetailBox
              icon={<FileText size={19} />}
              label="Customer Name"
              value={appointment.customer_name || "N/A"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatusBox
              label="Appointment Status"
              value={appointment.status || "pending"}
              className={getStatusBadgeClass(appointment.status)}
            />

            <StatusBox
              label="Payment Status"
              value={appointment.payment_status || "unpaid"}
              className={getPaymentBadgeClass(
                appointment.payment_status || "unpaid"
              )}
            />

            <StatusBox
              label="Refund Status"
              value={appointment.refund_status || "N/A"}
              className={getRefundBadgeClass(appointment.refund_status || "N/A")}
            />
          </div>

          <div className="space-y-4">
            <LargeDetailBox
              icon={<FileText size={18} />}
              label="Notes"
              value={appointment.notes || "N/A"}
            />

            <LargeDetailBox
              icon={<Shirt size={18} />}
              label="Fabric Details"
              value={appointment.fabric_details || "N/A"}
            />

            <LargeDetailBox
              icon={<FileText size={18} />}
              label="Design Preferences"
              value={appointment.design_preferences || "N/A"}
            />

            <LargeDetailBox
              icon={<ScissorsIcon />}
              label="Alteration Details"
              value={appointment.alteration_details || "N/A"}
            />
          </div>

          <div className="mt-7 flex flex-col sm:flex-row justify-end gap-3">
            {appointment.status !== "cancelled" &&
              appointment.status !== "completed" && (
                <Link
                  to={`/my-appointments/edit/${appointment.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white rounded-full px-6 py-3 hover:bg-gray-700 font-semibold transition"
                >
                  <Pencil size={17} />
                  Edit Appointment
                </Link>
              )}

            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 rounded-full px-6 py-3 hover:bg-gray-200 font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ icon, label, value }) {
  return (
    <div className="bg-[#fffaf7] border rounded-2xl p-4 flex items-start gap-3">
      <div className="text-pink-700 mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="font-semibold text-gray-900 break-words">{value}</p>
      </div>
    </div>
  );
}

function StatusBox({ label, value, className }) {
  return (
    <div className="border rounded-2xl p-4">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <span
        className={`capitalize inline-flex px-3 py-1 rounded-full text-xs font-bold ${className}`}
      >
        {value}
      </span>
    </div>
  );
}

function LargeDetailBox({ icon, label, value }) {
  return (
    <div className="border rounded-2xl p-4">
      <div className="flex items-center gap-2 font-bold mb-2 text-gray-900">
        <span className="text-pink-700">{icon}</span>
        {label}
      </div>
      <p className="text-gray-600 break-words whitespace-pre-wrap">{value}</p>
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