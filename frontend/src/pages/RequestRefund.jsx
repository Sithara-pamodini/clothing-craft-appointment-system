import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function RequestRefund() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    api.get(`/appointments/${id}`).then((response) => {
      setAppointment(response.data);
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
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-600">Loading appointment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-5 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Request Refund
      </h1>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5 text-sm space-y-2">
        <p>
          <strong>Service:</strong> {appointment.service?.name || "N/A"}
        </p>
        <p>
          <strong>Date:</strong> {appointment.appointment_date}
        </p>
        <p>
          <strong>Time:</strong> {appointment.appointment_time}
        </p>
        <p>
          <strong>Payment:</strong> {appointment.payment_status || "unpaid"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="block font-medium mb-2">
          Refund Reason
        </label>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows="5"
          placeholder="Enter reason for requesting a refund"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-zinc-900 text-white rounded-lg px-6 py-3 hover:bg-zinc-700"
        >
          Submit Refund Request
        </button>
      </form>
    </div>
  );
}

export default RequestRefund;