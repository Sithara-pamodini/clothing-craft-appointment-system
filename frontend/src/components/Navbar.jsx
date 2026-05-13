import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-zinc-900 px-8 py-6 flex items-center justify-between">
      <h1 className="text-white text-3xl font-bold">
        Clothing Craft
      </h1>

      <div className="flex gap-8">
        <Link className="text-white hover:text-yellow-400" to="/">
          Services
        </Link>

        <Link className="text-white hover:text-yellow-400" to="/book-appointment">
          Book Appointment
        </Link>

          <Link className="text-white hover:text-yellow-400" to="/login">
               Login
          </Link>

          <Link className="text-white hover:text-yellow-400" to="/register">
               Register
          </Link>
      </div>
    </nav>
  );
}

export default Navbar;