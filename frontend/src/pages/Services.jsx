import { useEffect, useState } from "react";
import api from "../services/api";

function Services() {
  const [services, setServices] = useState([]);

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

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-center mb-3">
          Tailoring Services
        </h1>

        <p className="text-gray-600 text-center">
          Browse our available clothing craft and tailoring services.
        </p>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600">No services found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold mb-2">
                {service.name}
              </h2>

              <p className="text-yellow-600 font-semibold mb-3">
                Rs. {service.price}
              </p>

              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;