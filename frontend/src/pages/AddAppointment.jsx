import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Save,
  User,
  Phone,
  Mail,
  Shirt,
  FileText,
  CreditCard,
  CheckCircle,
} from "lucide-react";
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
    api
      .get("/services")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error loading services:", error);
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
      alert("Walk-in appointment added successfully!");
      navigate("/admin/appointments");
    } catch (error) {
      console.error(error);
      alert("Failed to add appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] text-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 border-b">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-pink-700 font-semibold mb-4">
            Admin Panel
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Add Walk-in Appointment
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Create an appointment manually for customers who visit or contact
            Nilu Fashion directly.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <div className="mb-6">
          <Link
            to="/admin/appointments"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-pink-700 font-semibold"
          >
            <ArrowLeft size={18} />
            Back to Appointments
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 px-6 md:px-8 py-6 border-b">
            <h2 className="text-2xl font-bold">Appointment Details</h2>
            <p className="text-gray-600 mt-1">
              Enter the customer, service, schedule, payment, and job details.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 md:p-8"
          >
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Service
              </label>

              <select
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option value="">Select Service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Customer Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                />

                <input
                  name="customer_name"
                  placeholder="Enter customer name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                />

                <input
                  type="email"
                  name="customer_email"
                  placeholder="Enter customer email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                />

                <input
                  name="customer_phone"
                  placeholder="Enter customer phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Appointment Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                />

                <input
                  type="date"
                  name="appointment_date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.appointment_date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Appointment Time
              </label>

              <div className="relative">
                <Clock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                />

                <input
                  type="time"
                  name="appointment_time"
                  value={formData.appointment_time}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Appointment Status
              </label>

              <div className="relative">
                <CheckCircle
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Status
              </label>

              <div className="relative">
                <CreditCard
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                />

                <select
                  name="payment_status"
                  value={formData.payment_status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-4 text-pink-700"
                />

                <textarea
                  name="notes"
                  placeholder="Add customer notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fabric Details
              </label>

              <div className="relative">
                <Shirt
                  size={18}
                  className="absolute left-4 top-4 text-pink-700"
                />

                <textarea
                  name="fabric_details"
                  placeholder="Mention fabric type, color, material, or customer-provided fabric"
                  value={formData.fabric_details}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Design Preferences
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-4 text-pink-700"
                />

                <textarea
                  name="design_preferences"
                  placeholder="Describe preferred style, design, measurements, or reference details"
                  value={formData.design_preferences}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alteration Details
              </label>

              <textarea
                name="alteration_details"
                placeholder="Mention resizing, hemming, repair, or fitting details"
                value={formData.alteration_details}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Link
                to="/admin/appointments"
                className="w-full border border-gray-300 text-gray-900 rounded-full px-6 py-3 hover:bg-gray-100 text-center font-semibold transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 w-full bg-gray-900 text-white rounded-full px-6 py-3 hover:bg-gray-700 font-semibold transition"
              >
                <Save size={18} />
                Add Appointment
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddAppointment;