import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function AdminServices() {
  const [services, setServices] = useState([]);

  const loadServices = () => {
    api
      .get("/services")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error loading services:", error);
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
    <div className="bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Services</h1>
      <div className="mb-6">
          <Link
          to="/admin/services/add"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
          Add New Service
          </Link>
     </div>

      {services.length === 0 ? (
        <p className="text-gray-600">No services found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-zinc-900 text-white">
              <tr>
                <th className="p-3 text-left">Service Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t">
                  <td className="p-3">{service.name}</td>
                  <td className="p-3">Rs. {service.price}</td>
                  <td className="p-3">{service.description}</td>
                  <td className="p-3">
                    <Link
                         to={`/admin/services/edit/${service.id}`}
                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
                         >
                         Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminServices;