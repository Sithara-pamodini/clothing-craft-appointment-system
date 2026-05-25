import { useEffect, useState } from "react";
import api from "../services/api";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCustomers = () => {
    api
      .get("/users")
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading customers:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const getAvailabilityBadgeClass = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "busy":
        return "bg-yellow-100 text-yellow-800";
      case "unavailable":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAvailabilityChange = async (userId, availabilityStatus) => {
    try {
      await api.put(`/users/${userId}/availability`, {
        availability_status: availabilityStatus,
      });

      loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Failed to update availability status.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Manage Customers
      </h1>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600">Loading customers...</p>
        </div>
      ) : customers.length === 0 ? (
        <p className="text-gray-600">No customers found.</p>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border border-gray-200 table-fixed">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-3 text-left w-[25%]">Name</th>
                  <th className="p-3 text-left w-[35%]">Email</th>
                  <th className="p-3 text-left w-[15%]">Role</th>
                  <th className="p-3 text-left w-[25%]">Availability</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-t">
                    <td className="p-3 align-middle break-words">
                      {customer.name}
                    </td>

                    <td className="p-3 align-middle break-all">
                      {customer.email}
                    </td>

                    <td className="p-3 align-middle capitalize">
                      {customer.role}
                    </td>

                    <td className="p-3 align-middle">
                      <div className="flex flex-col gap-2">
                        <span
                          className={`capitalize px-3 py-1 rounded-full text-sm w-fit ${getAvailabilityBadgeClass(
                            customer.availability_status
                          )}`}
                        >
                          {customer.availability_status || "available"}
                        </span>

                        <select
                          value={customer.availability_status || "available"}
                          onChange={(e) =>
                            handleAvailabilityChange(
                              customer.id,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="available">Available</option>
                          <option value="busy">Busy</option>
                          <option value="unavailable">Unavailable</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <h3 className="font-bold text-lg mb-2 break-words">
                  {customer.name}
                </h3>

                <div className="text-sm space-y-3">
                  <p className="break-all">
                    <strong>Email:</strong> {customer.email}
                  </p>

                  <p className="capitalize">
                    <strong>Role:</strong> {customer.role}
                  </p>

                  <div>
                    <p className="mb-2">
                      <strong>Availability:</strong>{" "}
                      <span
                        className={`capitalize px-3 py-1 rounded-full text-sm ${getAvailabilityBadgeClass(
                          customer.availability_status
                        )}`}
                      >
                        {customer.availability_status || "available"}
                      </span>
                    </p>

                    <select
                      value={customer.availability_status || "available"}
                      onChange={(e) =>
                        handleAvailabilityChange(customer.id, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminCustomers;