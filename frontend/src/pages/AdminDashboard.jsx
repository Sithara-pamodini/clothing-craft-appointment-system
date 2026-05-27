import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Scissors,
  Users,
  UserCheck,
  Clock,
  UserX,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import api from "../services/api";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    appointments: 0,
    services: 0,
    customers: 0,
    availableStaff: 0,
    busyStaff: 0,
    unavailableStaff: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const appointmentsResponse = await api.get("/appointments");
        const servicesResponse = await api.get("/services");
        const usersResponse = await api.get("/users");

        const customers = usersResponse.data.filter(
          (user) => user.role === "customer"
        );

        const staffUsers = usersResponse.data.filter(
          (user) => user.role === "admin"
        );

        setStats({
          appointments: appointmentsResponse.data.length,
          services: servicesResponse.data.length,
          customers: customers.length,
          availableStaff: staffUsers.filter(
            (user) => (user.availability_status || "available") === "available"
          ).length,
          busyStaff: staffUsers.filter(
            (user) => user.availability_status === "busy"
          ).length,
          unavailableStaff: staffUsers.filter(
            (user) => user.availability_status === "unavailable"
          ).length,
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };

    loadStats();
  }, []);

  const overviewCards = [
    {
      title: "Appointments",
      value: stats.appointments,
      icon: CalendarDays,
      description: "Total customer bookings",
      link: "/admin/appointments",
      linkText: "Manage Appointments",
    },
    {
      title: "Services",
      value: stats.services,
      icon: Scissors,
      description: "Available fashion services",
      link: "/admin/services",
      linkText: "Manage Services",
    },
    {
      title: "Customers",
      value: stats.customers,
      icon: Users,
      description: "Registered customer accounts",
      link: "/admin/customers",
      linkText: "Manage Users",
    },
  ];

  const availabilityCards = [
    {
      title: "Available",
      value: stats.availableStaff,
      icon: UserCheck,
      className: "bg-green-50 border-green-200 text-green-800",
    },
    {
      title: "Busy",
      value: stats.busyStaff,
      icon: Clock,
      className: "bg-yellow-50 border-yellow-200 text-yellow-800",
    },
    {
      title: "Unavailable",
      value: stats.unavailableStaff,
      icon: UserX,
      className: "bg-red-50 border-red-200 text-red-800",
    },
  ];

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
                Nilu Fashion Dashboard
              </h1>

              <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                Welcome back,{" "}
                <span className="font-semibold text-gray-900">
                  {user?.name || "Admin"}
                </span>
                . Manage appointments, services, customers, reports, and staff
                availability from one place.
              </p>
            </div>

            <div className="bg-white border rounded-3xl px-6 py-5 shadow-sm text-center">
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="text-2xl font-bold">{user?.name || "Admin"}</p>
              <p className="text-sm text-pink-700 capitalize mt-1">
                {user?.role || "admin"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Stats */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-8">
          <p className="uppercase tracking-[0.25em] text-sm text-pink-700 font-semibold mb-2">
            Overview
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Business Summary
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {overviewCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white rounded-3xl shadow-sm border hover:shadow-lg transition overflow-hidden"
              >
                <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 p-6 border-b">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border flex items-center justify-center">
                      <Icon size={28} className="text-pink-700" />
                    </div>

                    <p className="text-4xl font-bold">{card.value}</p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>

                  <p className="text-gray-600 mb-5">{card.description}</p>

                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-2 text-pink-700 font-semibold hover:text-pink-900"
                  >
                    {card.linkText}
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Staff Availability */}
        <div className="mt-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="uppercase tracking-[0.25em] text-sm text-pink-700 font-semibold mb-2">
                Staff Status
              </p>

              <h2 className="text-3xl md:text-4xl font-bold">
                Staff Availability
              </h2>
            </div>

            <Link
              to="/admin/customers"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
            >
              Manage Staff
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {availabilityCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className={`rounded-3xl border p-6 shadow-sm ${card.className}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{card.title}</h3>
                      <p className="text-4xl font-bold mt-3">{card.value}</p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center">
                      <Icon size={28} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gray-900 text-white rounded-3xl p-8 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 size={30} className="text-pink-300" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  Quick Admin Actions
                </h2>
              </div>

              <p className="text-gray-300 max-w-2xl">
                Use these shortcuts to manage daily operations such as customer
                bookings, clothing services, users, and reports.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full lg:w-auto">
              <Link
                to="/admin/appointments"
                className="bg-white text-gray-900 px-5 py-3 rounded-full font-semibold hover:bg-gray-100 text-center transition"
              >
                Appointments
              </Link>

              <Link
                to="/admin/calendar"
                className="bg-white text-gray-900 px-5 py-3 rounded-full font-semibold hover:bg-gray-100 text-center transition"
              >
                Calendar
              </Link>

              <Link
                to="/admin/services"
                className="bg-white text-gray-900 px-5 py-3 rounded-full font-semibold hover:bg-gray-100 text-center transition"
              >
                Services
              </Link>

              <Link
                to="/admin/customers"
                className="bg-white text-gray-900 px-5 py-3 rounded-full font-semibold hover:bg-gray-100 text-center transition"
              >
                Users
              </Link>

              <Link
                to="/admin/reports"
                className="bg-pink-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-pink-700 text-center transition"
              >
                Reports
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;