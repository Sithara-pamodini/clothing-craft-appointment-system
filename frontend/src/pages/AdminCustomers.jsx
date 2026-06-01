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
  Eye,
  X,
  User,
} from "lucide-react";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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

            {/* Mobile and Tablet Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
              {customers.map((customer, index) => (
                <div
                  key={customer.id}
                  className="bg-white border rounded-3xl shadow-sm overflow-hidden"
                >
                  <div className="bg-gray-900 text-white px-5 py-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-pink-300 font-bold mb-1">
                        User #{index + 1}
                      </p>

                      <h3 className="text-lg font-bold break-words">
                        {customer.name || "N/A"}
                      </h3>

                      <p className="text-sm text-gray-300 mt-1 break-all">
                        {customer.email || "No email"}
                      </p>
                    </div>

                    <span
                      className={`capitalize px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getRoleBadgeClass(
                        customer.role
                      )}`}
                    >
                      {customer.role || "N/A"}
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-start gap-3 bg-[#fffaf7] border rounded-2xl p-4">
                        <ShieldCheck
                          size={18}
                          className="text-pink-700 mt-0.5"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Role</p>
                          <span
                            className={`capitalize inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${getRoleBadgeClass(
                              customer.role
                            )}`}
                          >
                            {customer.role || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-[#fffaf7] border rounded-2xl p-4">
                        <Clock size={18} className="text-pink-700 mt-0.5" />
                        <div className="w-full">
                          <p className="text-sm text-gray-500 mb-2">
                            Availability
                          </p>

                          <span
                            className={`capitalize inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${getAvailabilityBadgeClass(
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

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() =>
                          setSelectedCustomer({
                            ...customer,
                            display_number: index + 1,
                          })
                        }
                        title="View User"
                        aria-label="View User"
                        className="inline-flex items-center justify-center w-11 h-11 bg-pink-700 text-white rounded-full hover:bg-pink-800 transition"
                      >
                        <Eye size={18} />
                      </button>

                      <Link
                        to={`/admin/users/edit/${customer.id}`}
                        title="Edit User"
                        aria-label="Edit User"
                        className="inline-flex items-center justify-center w-11 h-11 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(customer.id)}
                        title="Delete User"
                        aria-label="Delete User"
                        className="inline-flex items-center justify-center w-11 h-11 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-3xl border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-900 text-white">
                    <tr>
                      <th className="px-5 py-4 text-sm font-semibold">No.</th>
                      <th className="px-5 py-4 text-sm font-semibold">
                        Name
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold">
                        Email
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold">
                        Role
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold">
                        Availability
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {customers.map((customer, index) => (
                      <tr
                        key={customer.id}
                        className="hover:bg-pink-50/60 transition"
                      >
                        <td className="px-5 py-5 align-middle">
                          <span className="font-bold text-pink-700">
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                              <User size={17} className="text-pink-700" />
                            </div>

                            <div>
                              <p className="font-bold text-gray-900 break-words">
                                {customer.name || "N/A"}
                              </p>
                              <p className="text-sm text-gray-500">
                                User account
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail size={15} className="text-pink-700" />
                            <span className="font-medium break-all">
                              {customer.email || "No email"}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <span
                            className={`capitalize inline-flex px-3 py-1 rounded-full text-xs font-bold ${getRoleBadgeClass(
                              customer.role
                            )}`}
                          >
                            {customer.role || "N/A"}
                          </span>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <div className="flex flex-col gap-2 max-w-[190px]">
                            <span
                              className={`capitalize inline-flex w-fit px-3 py-1 rounded-full text-xs font-bold ${getAvailabilityBadgeClass(
                                customer.availability_status
                              )}`}
                            >
                              {customer.availability_status || "available"}
                            </span>

                            <select
                              value={
                                customer.availability_status || "available"
                              }
                              onChange={(e) =>
                                handleAvailabilityChange(
                                  customer.id,
                                  e.target.value
                                )
                              }
                              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                            >
                              <option value="available">Available</option>
                              <option value="busy">Busy</option>
                              <option value="unavailable">Unavailable</option>
                            </select>
                          </div>
                        </td>

                        <td className="px-5 py-5 align-middle">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                setSelectedCustomer({
                                  ...customer,
                                  display_number: index + 1,
                                })
                              }
                              title="View User"
                              aria-label="View User"
                              className="inline-flex items-center justify-center w-10 h-10 bg-pink-700 text-white rounded-full hover:bg-pink-800 transition"
                            >
                              <Eye size={17} />
                            </button>

                            <Link
                              to={`/admin/users/edit/${customer.id}`}
                              title="Edit User"
                              aria-label="Edit User"
                              className="inline-flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
                            >
                              <Pencil size={17} />
                            </Link>

                            <button
                              onClick={() => handleDelete(customer.id)}
                              title="Delete User"
                              aria-label="Delete User"
                              className="inline-flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>

      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          getRoleBadgeClass={getRoleBadgeClass}
          getAvailabilityBadgeClass={getAvailabilityBadgeClass}
        />
      )}
    </div>
  );
}

function CustomerDetailsModal({
  customer,
  onClose,
  getRoleBadgeClass,
  getAvailabilityBadgeClass,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 px-4 py-6 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-5 rounded-t-3xl flex items-start justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-pink-700 font-semibold mb-2">
              User Details
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              User #{customer.display_number}
            </h2>

            <p className="text-gray-500 mt-1">
              Full account information for this system user.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition shrink-0"
            title="Close"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <DetailBox
              icon={<User size={19} />}
              label="Name"
              value={customer.name || "N/A"}
            />

            <DetailBox
              icon={<Mail size={19} />}
              label="Email"
              value={customer.email || "No email"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <StatusBox
              label="Role"
              value={customer.role || "N/A"}
              className={getRoleBadgeClass(customer.role)}
            />

            <StatusBox
              label="Availability"
              value={customer.availability_status || "available"}
              className={getAvailabilityBadgeClass(
                customer.availability_status
              )}
            />
          </div>

          <div className="mt-7 flex flex-col sm:flex-row justify-end gap-3">
            <Link
              to={`/admin/users/edit/${customer.id}`}
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white rounded-full px-6 py-3 hover:bg-gray-700 font-semibold transition"
            >
              <Pencil size={17} />
              Edit User
            </Link>

            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 rounded-full px-6 py-3 hover:bg-gray-200 font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ icon, label, value }) {
  return (
    <div className="bg-[#fffaf7] border rounded-2xl p-4 flex items-start gap-3">
      <div className="text-pink-700 mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="font-semibold text-gray-900 break-words">{value}</p>
      </div>
    </div>
  );
}

function StatusBox({ label, value, className }) {
  return (
    <div className="border rounded-2xl p-4">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <span
        className={`capitalize inline-flex px-3 py-1 rounded-full text-xs font-bold ${className}`}
      >
        {value}
      </span>
    </div>
  );
}

export default AdminCustomers;