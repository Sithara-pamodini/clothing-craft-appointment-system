import { useEffect, useState } from "react";
import api from "../services/api";

function AppointmentForm() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    service_id: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
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

    if (
      !formData.service_id ||
      !formData.customer_name ||
      !formData.customer_phone ||
      !formData.appointment_date ||
      !formData.appointment_time
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await api.post("/appointments", formData);
      alert("Appointment booked successfully!");

      setFormData({
        service_id: "",
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        appointment_date: "",
        appointment_time: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
        Book Appointment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5"
      >
        <select
          name="service_id"
          value={formData.service_id}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>

        <input
          name="customer_name"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        />

        <input
          type="email"
          name="customer_email"
          placeholder="Email"
          value={formData.customer_email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        />

        <input
          name="customer_phone"
          placeholder="Phone"
          value={formData.customer_phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        />

        <input
          type="date"
          name="appointment_date"
          min={new Date().toISOString().split("T")[0]}
          value={formData.appointment_date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        />

        <input
          type="time"
          name="appointment_time"
          value={formData.appointment_time}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 lg:col-span-2 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-zinc-900 text-white rounded-lg px-6 py-3 hover:bg-zinc-700 lg:col-span-2"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;