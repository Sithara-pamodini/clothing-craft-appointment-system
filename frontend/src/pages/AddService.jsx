import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Tag, FileText, Scissors } from "lucide-react";
import api from "../services/api";

function AddService() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/services", formData);

      alert("Service added successfully!");
      navigate("/admin/services");
    } catch (error) {
      console.error(error);
      alert("Failed to add service.");
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
            Add Service
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Create a new tailoring, fashion, alteration, or custom clothing
            service for Nilu Fashion.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        <div className="mb-6">
          <Link
            to="/admin/services"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-pink-700 font-semibold"
          >
            <ArrowLeft size={18} />
            Back to Services
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 px-6 md:px-8 py-6 border-b">
            <h2 className="text-2xl font-bold">Service Information</h2>
            <p className="text-gray-600 mt-1">
              Fill in the details below to add a new service.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Name
              </label>

              <div className="relative">
                <Scissors
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                />

                <input
                  name="name"
                  type="text"
                  placeholder="Example: Custom Dress Design"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>

              <div className="relative">
                <Tag
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                />

                <input
                  name="price"
                  type="number"
                  placeholder="Example: 2500"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Description
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-4 text-pink-700"
                />

                <textarea
                  name="description"
                  placeholder="Describe the service clearly for customers."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Link
                to="/admin/services"
                className="w-full border border-gray-300 text-gray-900 rounded-full px-6 py-3 hover:bg-gray-100 text-center font-semibold transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 w-full bg-gray-900 text-white rounded-full px-6 py-3 hover:bg-gray-700 font-semibold transition"
              >
                <Save size={18} />
                Add Service
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddService;