import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

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

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await api.delete(`/users/${userId}`);
      alert("User deleted successfully!");
      loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Manage Customers
        </h1>

        <Link
          to="/admin/users/add"
          className="bg-zinc-900 text-white px-5 py-2 rounded-lg hover:bg-zinc-700 text-center"
        >
          Add User
        </Link>
      </div>

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
                  <th className="p-3 text-left w-[22%]">Name</th>
                  <th className="p-3 text-left w-[30%]">Email</th>
                  <th className="p-3 text-left w-[12%]">Role</th>
                  <th className="p-3 text-left w-[24%]">Availability</th>
                  <th className="p-3 text-left w-[12%]">Action</th>
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

                    <td className="p-3 align-middle">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/users/edit/${customer.id}`}
                          title="Edit User"
                          className="w-9 h-9 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(customer.id)}
                          title="Delete User"
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

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/admin/users/edit/${customer.id}`}
                    title="Edit User"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => handleDelete(customer.id)}
                    title="Delete User"
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

export default AdminCustomers;