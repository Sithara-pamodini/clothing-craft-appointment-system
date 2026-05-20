import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-white rounded-xl shadow-md p-5 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Manage Services</h1>

        <Link
          to="/admin/services/add"
          className="inline-block bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 text-center"
        >
          Add New Service
        </Link>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600">Loading services...</p>
        </div>
      ) : services.length === 0 ? (
        <p className="text-gray-600">No services found.</p>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border border-gray-200 table-fixed">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-3 text-left w-[25%]">Service Name</th>
                  <th className="p-3 text-left w-[15%]">Price</th>
                  <th className="p-3 text-left w-[45%]">Description</th>
                  <th className="p-3 text-left w-[15%]">Action</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-t">
                    <td className="p-3 align-middle break-words">
                      {service.name}
                    </td>

                    <td className="p-3 align-middle break-words">
                      Rs. {service.price}
                    </td>

                    <td className="p-3 align-middle break-words">
                      {service.description || "N/A"}
                    </td>

                    <td className="p-3 align-middle">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/services/edit/${service.id}`}
                          title="Edit Service"
                          className="w-9 h-9 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(service.id)}
                          title="Delete Service"
                          className="w-9 h-9 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <h3 className="font-bold text-lg mb-2">
                  {service.name}
                </h3>

                <div className="text-sm space-y-1">
                  <p>
                    <strong>Price:</strong> Rs. {service.price}
                  </p>

                  <p>
                    <strong>Description:</strong>{" "}
                    {service.description || "N/A"}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/admin/services/edit/${service.id}`}
                    title="Edit Service"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => handleDelete(service.id)}
                    title="Delete Service"
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminServices;