import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCcw,
  CalendarDays,
  Clock,
  CreditCard,
  FileText,
  Send,
} from "lucide-react";
import api from "../services/api";

function RequestRefund() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    api
      .get(`/appointments/${id}`)
      .then((response) => {
        setAppointment(response.data);
      })
      .catch((error) => {
        console.error("Error loading appointment:", error);
        alert("Failed to load appointment details.");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      alert("Please enter a refund reason.");
      return;
    }

    try {
      await api.put(`/appointments/${id}`, {
        service_id: appointment.service_id,
        customer_name: appointment.customer_name,
        customer_email: appointment.customer_email,
        customer_phone: appointment.customer_phone,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        notes: `${appointment.notes || ""}\n\nRefund Reason: ${reason}`,
        fabric_details: appointment.fabric_details,
        design_preferences: appointment.design_preferences,
        alteration_details: appointment.alteration_details,
        status: appointment.status,
        payment_status: appointment.payment_status || "paid",
        refund_status: "requested",
      });

      alert("Refund request submitted successfully!");
      navigate("/my-appointments");
    } catch (error) {
      console.error(error);
      alert("Failed to submit refund request.");
    }
  };

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#fffaf7] text-gray-900">
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-sm border p-10 text-center">
            <p className="text-gray-600 text-lg">Loading appointment...</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf7] text-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 border-b">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-pink-700 font-semibold mb-4">
            Nilu Fashion
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Request Refund
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Submit a refund request for your cancelled paid appointment. Our
            team will review the request and update the refund status.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <div className="mb-6">
          <Link
            to="/my-appointments"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-pink-700 font-semibold"
          >
            <ArrowLeft size={18} />
            Back to My Appointments
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Appointment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
              <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 px-6 py-6 border-b">
                <div className="w-12 h-12 rounded-2xl bg-white border flex items-center justify-center mb-4">
                  <RefreshCcw size={24} className="text-pink-700" />
                </div>

                <h2 className="text-2xl font-bold">Appointment Summary</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Refund request will be linked to this appointment.
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-[#fffaf7] border rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-bold break-words">
                    {appointment.service?.name || "N/A"}
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-[#fffaf7] border rounded-2xl p-4">
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

                <div className="flex items-start gap-3 bg-[#fffaf7] border rounded-2xl p-4">
                  <Clock size={20} className="text-pink-700 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold">
                      {appointment.appointment_time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#fffaf7] border rounded-2xl p-4">
                  <CreditCard size={20} className="text-pink-700 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Payment</p>
                    <span className="capitalize inline-block mt-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {appointment.payment_status || "unpaid"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
              <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 px-6 md:px-8 py-6 border-b">
                <h2 className="text-2xl font-bold">Refund Details</h2>
                <p className="text-gray-600 mt-1">
                  Please explain why you are requesting a refund.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Refund Reason
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-4 top-4 text-pink-700"
                  />

                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows="8"
                    placeholder="Enter reason for requesting a refund"
                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  ></textarea>
                </div>

                <div className="mt-6 bg-pink-50 border border-pink-100 rounded-2xl p-4">
                  <p className="text-sm text-gray-700">
                    Your refund reason will be added to the appointment notes
                    and the refund status will be changed to{" "}
                    <span className="font-semibold text-pink-700">
                      requested
                    </span>
                    .
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <Link
                    to="/my-appointments"
                    className="w-full border border-gray-300 text-gray-900 rounded-full px-6 py-3 hover:bg-gray-100 text-center font-semibold transition"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full bg-gray-900 text-white rounded-full px-6 py-3 hover:bg-gray-700 font-semibold transition"
                  >
                    <Send size={18} />
                    Submit Refund Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RequestRefund;