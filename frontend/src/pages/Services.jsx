import { useEffect, useState } from "react";
import api from "../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-5 md:p-8 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-3">
          Tailoring Services
        </h1>

        <p className="text-gray-600 text-center text-sm md:text-base">
          Browse our available clothing craft and tailoring services.
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-5 md:p-8 text-center">
          <p className="text-gray-600">Loading services...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-5 md:p-8 text-center">
          <div className="flex flex-col items-center justify-center py-10">
          <div className="text-6xl mb-4">✂️</div>

          <h2 className="text-2xl font-bold text-zinc-800 mb-2">
            No Services Available
          </h2>

          <p className="text-gray-500 text-center max-w-md">
            Tailoring services have not been added yet. Please check back later for our latest fashion and clothing craft services.
          </p>
        </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md p-5 md:p-6 hover:shadow-lg transition"
            >
              <div className="flex flex-col gap-3 h-full">
                <div>
                  <h2 className="text-lg md:text-xl font-bold mb-2 break-words">
                    {service.name}
                  </h2>

                  <p className="text-yellow-600 font-semibold">
                    Rs. {service.price}
                  </p>
                </div>

                <p className="text-gray-600 text-sm md:text-base break-words">
                  {service.description || "No description available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;