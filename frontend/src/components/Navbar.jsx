import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");
    setIsOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-zinc-900 px-6 lg:px-8 py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl lg:text-3xl font-bold">
          Clothing Craft
        </h1>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden lg:flex gap-8 items-center">
          <Link className="text-white hover:text-yellow-400" to="/">
            Services
          </Link>

          <Link className="text-white hover:text-yellow-400" to="/book-appointment">
            Book Appointment
          </Link>

          <Link className="text-white hover:text-yellow-400" to="/my-appointments">
            My Appointments
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
                  <Link className="text-white hover:text-yellow-400" to="/admin/services">
                    Admin Services
                  </Link>

                  <Link className="text-white hover:text-yellow-400" to="/admin/appointments">
                    Appointments
                  </Link>

                  <Link className="text-white hover:text-yellow-400" to="/admin/customers">
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
      </div>

      {isOpen && (
        <div className="lg:hidden mt-5 flex flex-col gap-4 border-t border-zinc-700 pt-5">
          <Link onClick={closeMenu} className="text-white hover:text-yellow-400" to="/">
            Services
          </Link>

          <Link onClick={closeMenu} className="text-white hover:text-yellow-400" to="/book-appointment">
            Book Appointment
          </Link>

          <Link onClick={closeMenu} className="text-white hover:text-yellow-400" to="/my-appointments">
            My Appointments
          </Link>

          {!token ? (
            <>
              <Link onClick={closeMenu} className="text-white hover:text-yellow-400" to="/login">
                Login
              </Link>

              <Link onClick={closeMenu} className="text-white hover:text-yellow-400" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              {role === "admin" && (
                <>
                  <Link onClick={closeMenu} className="text-white hover:text-yellow-400" to="/admin/services">
                    Admin Services
                  </Link>

                  <Link onClick={closeMenu} className="text-white hover:text-yellow-400" to="/admin/appointments">
                    Appointments
                  </Link>

                  <Link onClick={closeMenu} className="text-white hover:text-yellow-400" to="/admin/customers">
                    Customers
                  </Link>

                  <Link onClick={closeMenu} className="text-white hover:text-yellow-400" to="/admin">
                    Dashboard
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;