import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import loginBg from "../assets/login-bg.png";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="hidden lg:block absolute bottom-10 left-8 md:left-16 text-white text-xs md:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-white text-blue-950 rounded-full flex items-center justify-center">
              ☎
            </span>
            <p>
              <strong>Phone</strong>
              <br />
              +123-456-7890
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-white text-blue-950 rounded-full flex items-center justify-center">
              ✉
            </span>
            <p>
              <strong>E-Mail</strong>
              <br />
              hello@nilufashion.com
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-white text-blue-950 rounded-full flex items-center justify-center">
              🌐
            </span>
            <p>
              <strong>Website</strong>
              <br />
              www.nilufashion.com
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-white text-blue-950 rounded-full flex items-center justify-center">
              ⌂
            </span>
            <p>
              <strong>Address</strong>
              <br />
              123 Anywhere St., Any City
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row items-end lg:items-center justify-center lg:justify-end px-5 md:px-20 py-8">
        <div className="w-full max-w-md">
          <h1 className="text-white text-2xl font-bold text-right mb-4">
            Nilu Fashion
          </h1>

          <div className="bg-[#24e7e1] rounded-[2rem] p-8 md:p-10 shadow-xl">
            <h2 className="text-2xl md:text-4xl font-black text-center text-blue-950 mb-8">
              LOGIN TO YOUR ACCOUNT
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-semibold text-blue-950">
                  Email Address :
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white rounded-full px-5 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-blue-950">
                  Password :
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white rounded-full px-5 py-3 outline-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-3">
                <div className="text-sm text-blue-950 font-medium">
                  Don’t have an account?
                  <br />
                  <Link to="/register" className="font-bold hover:underline">
                    Sign Up now
                  </Link>
                </div>

                <button
                  type="submit"
                  className="bg-white text-blue-950 px-10 py-3 rounded-full font-bold text-xl"
                >
                  LOGIN
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

export default Login;