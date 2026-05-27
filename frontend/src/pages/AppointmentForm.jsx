import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

function AppointmentForm() {
  const [services, setServices] = useState([]);
  const [searchParams] = useSearchParams();

  const selectedServiceId = searchParams.get("service_id");

  const initialFormData = {
    service_id: selectedServiceId || "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
    fabric_details: "",
    design_preferences: "",
    alteration_details: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    api
      .get("/services")
      .then((response) => {
        setServices(response.data);

        if (selectedServiceId) {
          setFormData((prevData) => ({
            ...prevData,
            service_id: selectedServiceId,
          }));
        }
      })
      .catch((error) => {
        console.error("Error loading services:", error);
      });
  }, [selectedServiceId]);

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
        service_id: selectedServiceId || "",
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        appointment_date: "",
        appointment_time: "",
        notes: "",
        fabric_details: "",
        design_preferences: "",
        alteration_details: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] px-4 py-10 md:py-14">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <p className="uppercase tracking-[0.3em] text-sm text-pink-700 font-semibold mb-3">
            Nilu Fashion
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Book Appointment
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Schedule your visit for tailoring, fitting, alterations, or custom
            clothing services.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 px-6 md:px-8 py-6 border-b">
            <h2 className="text-2xl font-bold">Appointment Details</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 p-6 md:p-8"
          >
            <div className="lg:col-span-2">
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

              <input
                name="customer_name"
                placeholder="Enter your name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="customer_email"
                placeholder="Enter your email"
                value={formData.customer_email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>

              <input
                name="customer_phone"
                placeholder="Enter your phone number"
                value={formData.customer_phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Appointment Date
              </label>

              <input
                type="date"
                name="appointment_date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.appointment_date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Appointment Time
              </label>

              <input
                type="time"
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes
              </label>

              <textarea
                name="notes"
                placeholder="Add any special notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              ></textarea>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fabric Details
              </label>

              <textarea
                name="fabric_details"
                placeholder="Mention fabric type, color, or material details"
                value={formData.fabric_details}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              ></textarea>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Design Preferences
              </label>

              <textarea
                name="design_preferences"
                placeholder="Describe your preferred style, design, or reference idea"
                value={formData.design_preferences}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              ></textarea>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alteration Details
              </label>

              <textarea
                name="alteration_details"
                placeholder="Mention resizing, repair, hemming, or fitting details"
                value={formData.alteration_details}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white rounded-full px-6 py-3 hover:bg-gray-700 lg:col-span-2 font-semibold transition"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;