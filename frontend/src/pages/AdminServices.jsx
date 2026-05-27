import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Scissors,
  Tag,
  FileText,
} from "lucide-react";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceImages = [
    "/images/lady-wear.png",
    "/images/Occasion.png",
    "/images/Custom.png",
    "/images/Alterations.png",
  ];

  const loadServices = () => {
    api
      .get("/services")
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading services:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      await api.delete(`/services/${id}`);
      alert("Service deleted successfully!");
      loadServices();
    } catch (error) {
      console.error(error);
      alert("Failed to delete service.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] text-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-pink-700 font-semibold mb-4">
                Admin Panel
              </p>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Manage Services
              </h1>

              <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                Add, edit, and manage Nilu Fashion tailoring, clothing,
                alteration, and custom dress services.
              </p>
            </div>

            <Link
              to="/admin/services/add"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
            >
              <Plus size={18} />
              Add New Service
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {loading ? (
          <div className="bg-white rounded-3xl shadow-sm border p-10 text-center">
            <p className="text-gray-600 text-lg">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border p-8 md:p-12 text-center">
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mb-5">
                <Scissors size={38} className="text-pink-700" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
                No Services Found
              </h2>

              <p className="text-gray-500 text-center max-w-md mb-6">
                No tailoring or clothing services have been added yet. Start by
                adding your first service.
              </p>

              <Link
                to="/admin/services/add"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
              >
                <Plus size={18} />
                Add Service
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="uppercase tracking-[0.25em] text-sm text-pink-700 font-semibold mb-2">
                  Service List
                </p>

                <h2 className="text-3xl md:text-4xl font-bold">
                  Available Services
                </h2>
              </div>

              <div className="bg-white border rounded-2xl px-5 py-4 shadow-sm">
                <p className="text-sm text-gray-500">Total Services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl shadow-sm border hover:shadow-lg transition overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={serviceImages[index % serviceImages.length]}
                      alt={service.name}
                      className="w-full h-56 object-cover"
                    />

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                      <span className="text-sm font-semibold text-pink-700">
                        Nilu Fashion
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 break-words">
                      {service.name}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 bg-[#fffaf7] rounded-2xl p-4 border">
                        <Tag size={20} className="text-pink-700 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="font-bold text-yellow-700">
                            Rs. {service.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-[#fffaf7] rounded-2xl p-4 border">
                        <FileText
                          size={20}
                          className="text-pink-700 mt-0.5"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Description</p>
                          <p className="text-gray-700 break-words">
                            {service.description || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Link
                        to={`/admin/services/edit/${service.id}`}
                        className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-full hover:bg-gray-700 font-semibold transition"
                      >
                        <Pencil size={17} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(service.id)}
                        className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-full hover:bg-red-700 font-semibold transition"
                      >
                        <Trash2 size={17} />
                        Delete
                      </button>
                    </div>
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

export default AdminServices;