import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Lock,
  ShieldCheck,
  Clock,
} from "lucide-react";
import api from "../services/api";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    availability_status: "available",
  });

  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((response) => {
        const user = response.data;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          password: "",
          role: user.role || "customer",
          availability_status: user.availability_status || "available",
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading user:", error);
        alert("Failed to load user details.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/users/${id}`, formData);
      alert("User updated successfully!");
      navigate("/admin/customers");
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] text-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 border-b">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-pink-700 font-semibold mb-4">
            Admin Panel
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">Edit User</h1>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Update user account details, role permissions, password, and staff
            availability status.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        <div className="mb-6">
          <Link
            to="/admin/customers"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-pink-700 font-semibold"
          >
            <ArrowLeft size={18} />
            Back to Users
          </Link>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl shadow-sm border p-10 text-center">
            <p className="text-gray-600 text-lg">Loading user details...</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 px-6 md:px-8 py-6 border-b">
              <h2 className="text-2xl font-bold">User Information</h2>
              <p className="text-gray-600 mt-1">
                Edit the details below and save your changes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                  />

                  <input
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Leave blank to keep current password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Leave this field empty if you do not want to change the
                  password.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>

                <div className="relative">
                  <ShieldCheck
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                  />

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin / Staff</option>
                  </select>
                </div>
              </div>

              {formData.role === "admin" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability Status
                  </label>

                  <div className="relative">
                    <Clock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-700"
                    />

                    <select
                      name="availability_status"
                      value={formData.availability_status}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    >
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Link
                  to="/admin/customers"
                  className="w-full border border-gray-300 text-gray-900 rounded-full px-6 py-3 hover:bg-gray-100 text-center font-semibold transition"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full bg-gray-900 text-white rounded-full px-6 py-3 hover:bg-gray-700 font-semibold transition"
                >
                  <Save size={18} />
                  Update User
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default EditUser;