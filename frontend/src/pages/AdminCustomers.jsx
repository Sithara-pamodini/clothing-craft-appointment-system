import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Users,
  Mail,
  ShieldCheck,
  Clock,
} from "lucide-react";

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

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "customer":
        return "bg-blue-100 text-blue-800";
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
                Manage Users
              </h1>

              <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                Manage customer accounts, admin users, roles, and staff
                availability for Nilu Fashion.
              </p>
            </div>

            <Link
              to="/admin/users/add"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
            >
              <Plus size={18} />
              Add User
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {loading ? (
          <div className="bg-white rounded-3xl shadow-sm border p-10 text-center">
            <p className="text-gray-600 text-lg">Loading users...</p>
          </div>
        ) : customers.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border p-8 md:p-12 text-center">
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mb-5">
                <Users size={38} className="text-pink-700" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
                No Users Found
              </h2>

              <p className="text-gray-500 text-center max-w-md mb-6">
                No customer or admin users have been added yet. Start by adding
                a new user account.
              </p>

              <Link
                to="/admin/users/add"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
              >
                <Plus size={18} />
                Add User
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="uppercase tracking-[0.25em] text-sm text-pink-700 font-semibold mb-2">
                  User List
                </p>

                <h2 className="text-3xl md:text-4xl font-bold">
                  System Users
                </h2>
              </div>

              <div className="bg-white border rounded-2xl px-5 py-4 shadow-sm">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="bg-white rounded-3xl shadow-sm border hover:shadow-lg transition overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 p-6 border-b">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-pink-700 font-semibold mb-2">
                          User #{customer.id}
                        </p>

                        <h3 className="font-bold text-2xl break-words">
                          {customer.name}
                        </h3>
                      </div>

                      <span
                        className={`capitalize px-4 py-2 rounded-full text-sm font-semibold w-fit whitespace-nowrap ${getRoleBadgeClass(
                          customer.role
                        )}`}
                      >
                        {customer.role}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3 bg-[#fffaf7] rounded-2xl p-4 border">
                        <Mail size={20} className="text-pink-700 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-semibold break-all">
                            {customer.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-[#fffaf7] rounded-2xl p-4 border">
                        <ShieldCheck
                          size={20}
                          className="text-pink-700 mt-0.5"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Role</p>
                          <span
                            className={`capitalize inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeClass(
                              customer.role
                            )}`}
                          >
                            {customer.role}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-[#fffaf7] rounded-2xl p-4 border">
                        <Clock size={20} className="text-pink-700 mt-0.5" />
                        <div className="w-full">
                          <p className="text-sm text-gray-500 mb-2">
                            Availability
                          </p>

                          <span
                            className={`capitalize inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getAvailabilityBadgeClass(
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
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                          >
                            <option value="available">Available</option>
                            <option value="busy">Busy</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to={`/admin/users/edit/${customer.id}`}
                        title="Edit User"
                        className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-full hover:bg-gray-700 font-semibold transition"
                      >
                        <Pencil size={17} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(customer.id)}
                        title="Delete User"
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

export default AdminCustomers;