import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    api
      .get(`/services/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
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
      await api.put(`/services/${id}`, formData);

      alert("Service updated successfully!");
      navigate("/admin/services");
    } catch (error) {
      console.error(error);
      alert("Failed to update service.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Service</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          type="text"
          placeholder="Service Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />

        <textarea
          name="description"
          placeholder="Service Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        ></textarea>

        <button
          type="submit"
          className="bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-700"
        >
          Update Service
        </button>
      </form>
    </div>
  );
}

export default EditService;