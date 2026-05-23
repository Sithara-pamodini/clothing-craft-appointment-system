import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddAppointment() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    service_id: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
    fabric_details: "",
    design_preferences: "",
    alteration_details: "",
    status: "confirmed",
    payment_status: "unpaid",
    refund_status: "",
  });

  useEffect(() => {
    api.get("/services").then((response) => {
      setServices(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/appointments", formData);
      alert("Walk-in appointment added successfully!");
      navigate("/admin/appointments");
    } catch (error) {
      console.error(error);
      alert("Failed to add appointment.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-5 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Add Walk-in Appointment
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <select name="service_id" value={formData.service_id} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-3">
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </select>

        <input name="customer_name" placeholder="Customer Name" value={formData.customer_name} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-3" />

        <input type="email" name="customer_email" placeholder="Email" value={formData.customer_email} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3" />

        <input name="customer_phone" placeholder="Phone" value={formData.customer_phone} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-3" />

        <input type="date" name="appointment_date" min={new Date().toISOString().split("T")[0]} value={formData.appointment_date} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-3" />

        <input type="time" name="appointment_time" value={formData.appointment_time} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-3" />

        <select name="status" value={formData.status} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3">
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select name="payment_status" value={formData.payment_status} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3">
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
          <option value="refunded">Refunded</option>
        </select>

        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} rows="3" className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2" />

        <textarea name="fabric_details" placeholder="Fabric Details" value={formData.fabric_details} onChange={handleChange} rows="3" className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2" />

        <textarea name="design_preferences" placeholder="Design Preferences" value={formData.design_preferences} onChange={handleChange} rows="3" className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2" />

        <textarea name="alteration_details" placeholder="Alteration Details" value={formData.alteration_details} onChange={handleChange} rows="3" className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2" />

        <button type="submit" className="bg-zinc-900 text-white rounded-lg px-6 py-3 hover:bg-zinc-700 md:col-span-2">
          Add Appointment
        </button>
      </form>
    </div>
  );
}

export default AddAppointment;