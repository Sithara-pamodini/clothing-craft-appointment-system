import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  RefreshCcw,
  Scissors,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import api from "../services/api";

function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/reports/summary")
      .then((response) => {
        setReport(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading report:", error);
        setLoading(false);
      });
  }, []);

  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[monthNumber - 1] || "N/A";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf7] text-gray-900">
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-sm border p-10 text-center">
            <p className="text-gray-600 text-lg">Loading reports...</p>
          </div>
        </section>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#fffaf7] text-gray-900">
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-sm border p-10 text-center">
            <p className="text-gray-600 text-lg">
              Report data could not be loaded.
            </p>
          </div>
        </section>
      </div>
    );
  }

  const summaryCards = [
    {
      title: "Total Appointments",
      value: report.total_appointments,
      icon: CalendarDays,
      label: "All bookings",
    },
    {
      title: "Pending",
      value: report.pending_appointments,
      icon: Clock,
      label: "Waiting",
    },
    {
      title: "Confirmed",
      value: report.confirmed_appointments,
      icon: CheckCircle,
      label: "Approved",
    },
    {
      title: "Completed",
      value: report.completed_appointments,
      icon: CheckCircle,
      label: "Finished",
    },
    {
      title: "Cancelled",
      value: report.cancelled_appointments,
      icon: XCircle,
      label: "Stopped",
    },
    {
      title: "Paid",
      value: report.paid_appointments,
      icon: CreditCard,
      label: "Payments",
    },
    {
      title: "Unpaid",
      value: report.unpaid_appointments,
      icon: CreditCard,
      label: "Pending pay",
    },
    {
      title: "Refund Requests",
      value: report.refund_requests,
      icon: RefreshCcw,
      label: "Refunds",
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
                Reports & Insights
              </h1>

              <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                Review appointment performance, service demand, monthly trends,
                payment status, refund requests, and customer preferences.
              </p>
            </div>

            <div className="bg-white border rounded-3xl px-6 py-5 shadow-sm text-center">
              <p className="text-sm text-gray-500">Total Appointments</p>
              <p className="text-3xl font-bold">
                {report.total_appointments || 0}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-8">
          <p className="uppercase tracking-[0.25em] text-sm text-pink-700 font-semibold mb-2">
            Summary
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Appointment Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white rounded-3xl shadow-sm border hover:shadow-md transition overflow-hidden"
              >
                <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 p-5 border-b">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border flex items-center justify-center">
                      <Icon size={24} className="text-pink-700" />
                    </div>

                    <span className="text-xs font-semibold text-pink-700 bg-white px-3 py-1 rounded-full border">
                      {card.label}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <h3 className="text-4xl font-bold mt-2">
                    {card.value || 0}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Report Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 mt-12">
          {/* Appointments by Service */}
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white border flex items-center justify-center">
                  <Scissors size={22} className="text-pink-700" />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Appointments by Service
                  </h2>
                  <p className="text-sm text-gray-600">
                    Service-wise booking count
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!report.appointments_by_service ||
              report.appointments_by_service.length === 0 ? (
                <p className="text-gray-600">
                  No service report data available.
                </p>
              ) : (
                <div className="space-y-4">
                  {report.appointments_by_service.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 bg-[#fffaf7] border rounded-2xl p-4"
                    >
                      <div>
                        <p className="font-semibold break-words">
                          {item.service_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Total appointments
                        </p>
                      </div>

                      <span className="bg-gray-900 text-white rounded-full px-4 py-2 font-bold">
                        {item.total}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Monthly Appointment Trends */}
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white border flex items-center justify-center">
                  <TrendingUp size={22} className="text-pink-700" />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Monthly Appointment Trends
                  </h2>
                  <p className="text-sm text-gray-600">
                    Bookings grouped by month
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!report.monthly_appointments ||
              report.monthly_appointments.length === 0 ? (
                <p className="text-gray-600">
                  No monthly report data available.
                </p>
              ) : (
                <div className="space-y-4">
                  {report.monthly_appointments.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 bg-[#fffaf7] border rounded-2xl p-4"
                    >
                      <div>
                        <p className="font-semibold">
                          {getMonthName(item.month)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Total appointments
                        </p>
                      </div>

                      <span className="bg-gray-900 text-white rounded-full px-4 py-2 font-bold">
                        {item.total}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Customer Preferences */}
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white border flex items-center justify-center">
                  <Users size={22} className="text-pink-700" />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Customer Preferences</h2>
                  <p className="text-sm text-gray-600">
                    Most requested services
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!report.customer_preferences ||
              report.customer_preferences.length === 0 ? (
                <p className="text-gray-600">
                  No customer preference data available.
                </p>
              ) : (
                <div className="space-y-4">
                  {report.customer_preferences.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 bg-[#fffaf7] border rounded-2xl p-4"
                    >
                      <div>
                        <p className="font-semibold break-words">
                          {item.service_name}
                        </p>
                        <p className="text-sm text-gray-500">Bookings</p>
                      </div>

                      <span className="bg-gray-900 text-white rounded-full px-4 py-2 font-bold">
                        {item.total}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Insight Box */}
        <div className="mt-12 bg-gray-900 text-white rounded-3xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 size={28} className="text-pink-300" />

                <h2 className="text-2xl md:text-3xl font-bold">
                  Business Insight
                </h2>
              </div>

              <p className="text-gray-300 max-w-3xl">
                Use these reports to understand which services are most popular,
                how appointment demand changes each month, and how many bookings
                are pending, completed, paid, unpaid, cancelled, or waiting for
                refund review.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl px-6 py-5 min-w-[180px]">
              <p className="text-gray-300 text-sm">Refund Requests</p>
              <p className="text-3xl font-bold">
                {report.refund_requests || 0}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reports;