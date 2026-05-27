import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, Scissors } from "lucide-react";
import api from "../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceImages = [
    "/images/Bridal_Party-Wear.png",
    "/images/Length-Adjustment.png",
    "/images/Custom.png",
    "/images/Ladies-Blouse-Stitching.png",
    "/images/Saree-Jacket-Stitching.png",
    "/images/Alterations.png",
  ];

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
    <div className="min-h-screen bg-[#fffaf7] text-gray-900">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-pink-700 font-semibold mb-4">
            Nilu Fashion Services
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Tailoring & Clothing Services
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our available clothing craft, tailoring, fitting, alteration,
            and dress design services created to match your personal style.
          </p>
        </div>
      </section>

      {/* Services Content */}
      <section className="max-w-7xl mx-auto px-4 py-14 md:py-16">
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
                No Services Available
              </h2>

              <p className="text-gray-500 text-center max-w-md">
                Tailoring services have not been added yet. Please check back
                later for our latest fashion and clothing craft services.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="uppercase tracking-[0.25em] text-sm text-pink-700 font-semibold mb-2">
                  Available Services
                </p>

                <h2 className="text-3xl md:text-4xl font-bold">
                  Choose Your Service
                </h2>
              </div>

              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
              >
                <CalendarCheck size={18} />
                Book Appointment
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl shadow-sm border hover:shadow-lg transition overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={serviceImages[index % serviceImages.length]}
                      alt={service.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                    />

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                      <span className="text-sm font-semibold text-pink-700">
                        Nilu Fashion
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-7">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 break-words">
                      {service.name}
                    </h3>

                    <p className="text-yellow-700 font-bold text-lg mb-4">
                      Rs. {service.price}
                    </p>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed break-words mb-6">
                      {service.description || "No description available."}
                    </p>

                    <Link
                      to={`/book-appointment?service_id=${service.id}`}
                      className="inline-flex items-center justify-center w-full bg-gray-900 text-white px-5 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
                    >
                      Book This Service
                    </Link>
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

export default Services;