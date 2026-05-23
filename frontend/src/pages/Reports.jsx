import { useEffect, useState } from "react";
import api from "../services/api";

function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    api
      .get("/reports/summary")
      .then((response) => {
        setReport(response.data);
      })
      .catch((error) => {
        console.error("Error loading report:", error);
      });
  }, []);

  if (!report) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-600">Loading reports...</p>
      </div>
    );
  }

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

  const cards = [
    ["Total Appointments", report.total_appointments],
    ["Pending", report.pending_appointments],
    ["Confirmed", report.confirmed_appointments],
    ["Completed", report.completed_appointments],
    ["Cancelled", report.cancelled_appointments],
    ["Paid", report.paid_appointments],
    ["Unpaid", report.unpaid_appointments],
    ["Refund Requests", report.refund_requests],
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-5 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(([title, value]) => (
          <div key={title} className="border rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-3xl font-bold mt-2">{value}</h2>
          </div>
        ))}
      </div>

     <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Appointments by Service</h2>

        {report.appointments_by_service?.length === 0 ? (
          <p className="text-gray-600">No service report data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-3 text-left">Service</th>
                  <th className="p-3 text-left">Total Appointments</th>
                </tr>
              </thead>

              <tbody>
                {report.appointments_by_service?.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{item.service_name}</td>
                    <td className="p-3">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
     </div>

     <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          Monthly Appointment Trends
        </h2>

        {report.monthly_appointments?.length === 0 ? (
          <p className="text-gray-600">No monthly report data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-3 text-left">Month</th>
                  <th className="p-3 text-left">Total Appointments</th>
                </tr>
              </thead>

              <tbody>
                {report.monthly_appointments?.map((item) => (
                  <tr key={item.month} className="border-t">
                    <td className="p-3">{getMonthName(item.month)}</td>
                    <td className="p-3">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
               Customer Preferences
          </h2>

          {report.customer_preferences?.length === 0 ? (
          <p className="text-gray-600">No customer preference data available.</p>
          ) : (
          <div className="overflow-x-auto">
               <table className="w-full border border-gray-200">
               <thead className="bg-zinc-900 text-white">
                    <tr>
                    <th className="p-3 text-left">Preferred Service</th>
                    <th className="p-3 text-left">Bookings</th>
                    </tr>
               </thead>

               <tbody>
                    {report.customer_preferences?.map((item, index) => (
                    <tr key={index} className="border-t">
                    <td className="p-3">{item.service_name}</td>
                    <td className="p-3">{item.total}</td>
                    </tr>
                    ))}
               </tbody>
               </table>
          </div>
          )}
     </div>
     </div>
  );
}

export default Reports;