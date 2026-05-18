import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditAppointment() {
  const { id } = useParams();
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
    status: "pending",
  });

  useEffect(() => {
    api.get("/services").then((response) => {
      setServices(response.data);
    });

    api.get(`/appointments/${id}`).then((response) => {
      setFormData(response.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/appointments/${id}`, formData);
      alert("Appointment updated successfully!");
      navigate("/admin/appointments");
    } catch (error) {
      console.error(error);
      alert("Failed to update appointment.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Appointment</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <select
          name="service_id"
          value={formData.service_id}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
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
          value={formData.customer_name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="email"
          name="customer_email"
          value={formData.customer_email || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          name="customer_phone"
          value={formData.customer_phone}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="time"
          name="appointment_time"
          value={formData.appointment_time}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <select
          name="status"
          value={formData.status || "pending"}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <textarea
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2"
        ></textarea>

        <button
          type="submit"
          className="bg-zinc-900 text-white rounded-lg px-6 py-3 hover:bg-zinc-700 md:col-span-2"
        >
          Update Appointment
        </button>
      </form>
    </div>
  );
}

export default EditAppointment;