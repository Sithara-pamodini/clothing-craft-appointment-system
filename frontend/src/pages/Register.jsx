import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import loginBg from "../assets/login-bg.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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
      await api.post("/register", formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="hidden lg:block absolute bottom-10 left-8 md:left-16 text-white text-xs md:text-sm">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <p><strong>Phone</strong><br />+123-456-7890</p>
          <p><strong>E-Mail</strong><br />hello@nilufashion.com</p>
          <p><strong>Website</strong><br />www.nilufashion.com</p>
          <p><strong>Address</strong><br />123 Anywhere St., Any City</p>
        </div>
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-end px-5 md:px-20 py-8">
        <div className="w-full max-w-md">
          <h1 className="text-white text-2xl font-bold text-right mb-4">
            Nilu Fashion
          </h1>

          <div className="bg-[#24e7e1] rounded-[2rem] p-6 md:p-10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-black text-center text-blue-950 mb-8">
              CREATE YOUR ACCOUNT
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white rounded-full px-5 py-3 outline-none"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white rounded-full px-5 py-3 outline-none"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white rounded-full px-5 py-3 outline-none"
              />

              <input
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                className="w-full bg-white rounded-full px-5 py-3 outline-none"
              />

              <div className="flex items-center justify-between gap-4 pt-3">
                <div className="text-sm text-blue-950 font-medium">
                  Already have an account?
                  <br />
                  <Link to="/login" className="font-bold hover:underline">
                    Login now
                  </Link>
                </div>

                <button
                  type="submit"
                  className="bg-white text-blue-950 px-8 py-3 rounded-full font-bold text-lg"
                >
                  REGISTER
                </button>
              </div>
            </form>
          </div>

          <div className="lg:hidden mt-6 text-white text-xs grid grid-cols-2 gap-3">
            <p><strong>Phone</strong><br />+123-456-7890</p>
            <p><strong>E-Mail</strong><br />hello@nilufashion.com</p>
            <p><strong>Website</strong><br />www.nilufashion.com</p>
            <p><strong>Address</strong><br />123 Anywhere St., Any City</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;