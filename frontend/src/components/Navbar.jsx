import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-zinc-900 px-8 py-6 flex items-center justify-between">
      <h1 className="text-white text-3xl font-bold">
        Clothing Craft
      </h1>

      <div className="flex gap-8 items-center">
        <Link className="text-white hover:text-yellow-400" to="/">
          Services
        </Link>

        <Link
          className="text-white hover:text-yellow-400"
          to="/book-appointment"
        >
          Book Appointment
        </Link>

        {!token ? (
          <>
            <Link className="text-white hover:text-yellow-400" to="/login">
              Login
            </Link>

            <Link className="text-white hover:text-yellow-400" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            {role === "admin" && (
              <>
                <Link
                  className="text-white hover:text-yellow-400"
                  to="/admin/services"
                >
                  Admin Services
                </Link>

                <Link
                  className="text-white hover:text-yellow-400"
                  to="/admin/appointments"
                >
                  Appointments
                </Link>

                <Link
                  className="text-white hover:text-yellow-400"
                  to="/admin/customers"
                >
                  Customers
                </Link>

                <Link className="text-white hover:text-yellow-400" to="/admin">
                  Dashboard
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;