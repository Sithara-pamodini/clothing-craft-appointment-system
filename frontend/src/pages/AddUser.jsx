import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    availability_status: "available",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", formData);
      alert("User created successfully!");
      navigate("/admin/customers");
    } catch (error) {
      console.error(error);
      alert("Failed to create user.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-5 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Add User</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin / Staff</option>
        </select>

        {formData.role === "admin" && (
          <select
            name="availability_status"
            value={formData.availability_status}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="unavailable">Unavailable</option>
          </select>
        )}

        <button
          type="submit"
          className="bg-zinc-900 text-white rounded-lg px-6 py-3 hover:bg-zinc-700"
        >
          Create User
        </button>
      </form>
    </div>
  );
}

export default AddUser;