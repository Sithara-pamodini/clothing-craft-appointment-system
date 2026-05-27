import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import api from "../services/api";

function AdminCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    api
      .get("/appointments")
      .then((response) => {
        const calendarEvents = response.data.map((appointment) => {
          const date = appointment.appointment_date;
          const time = appointment.appointment_time;

          return {
            id: appointment.id,
            title: `${appointment.service?.name || "Appointment"} - ${
              appointment.customer_name
            }`,
            start: `${date}T${time}`,
            extendedProps: {
              service_name: appointment.service?.name || "N/A",
              customer_name: appointment.customer_name,
              customer_email: appointment.customer_email,
              customer_phone: appointment.customer_phone,
              appointment_date: appointment.appointment_date,
              appointment_time: appointment.appointment_time,
              status: appointment.status,
              payment_status: appointment.payment_status,
              refund_status: appointment.refund_status,
              notes: appointment.notes,
              fabric_details: appointment.fabric_details,
              design_preferences: appointment.design_preferences,
              alteration_details: appointment.alteration_details,
            },
          };
        });

        setEvents(calendarEvents);
      })
      .catch((error) => {
        console.error("Error loading calendar appointments:", error);
      });
  }, []);

  const handleEventClick = (info) => {
    setSelectedAppointment({
      id: info.event.id,
      title: info.event.title,
      ...info.event.extendedProps,
    });
  };

  const closePopup = () => {
    setSelectedAppointment(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentBadgeClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] text-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
          <p className="uppercase tracking-[0.3em] text-sm text-pink-700 font-semibold mb-4">
            Admin Panel
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Appointment Calendar
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl">
            View all Nilu Fashion appointments in a calendar layout. Click an
            appointment to view full booking details.
          </p>
        </div>
      </section>

      {/* Calendar */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-14">
        <div className="bg-white rounded-3xl shadow-sm border p-4 md:p-6 overflow-hidden">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView={isMobile ? "listWeek" : "dayGridMonth"}
            headerToolbar={
              isMobile
                ? {
                    left: "prev,next",
                    center: "title",
                    right: "today",
                  }
                : {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                  }
            }
            events={events}
            eventClick={handleEventClick}
            height="auto"
          />
        </div>
      </section>

      {/* Popup */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 px-6 md:px-8 py-6 border-b rounded-t-3xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-pink-700 font-semibold mb-2">
                    Appointment #{selectedAppointment.id}
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold">
                    {selectedAppointment.service_name}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    {selectedAppointment.customer_name}
                  </p>
                </div>

                <button
                  onClick={closePopup}
                  className="w-10 h-10 rounded-full bg-white border hover:bg-gray-100 font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#fffaf7] border rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">
                    {selectedAppointment.appointment_date}
                  </p>
                </div>

                <div className="bg-[#fffaf7] border rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold">
                    {selectedAppointment.appointment_time}
                  </p>
                </div>

                <div className="bg-[#fffaf7] border rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold break-words">
                    {selectedAppointment.customer_phone || "N/A"}
                  </p>
                </div>

                <div className="bg-[#fffaf7] border rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold break-words">
                    {selectedAppointment.customer_email || "N/A"}
                  </p>
                </div>

                <div className="bg-[#fffaf7] border rounded-2xl p-4">
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  <span
                    className={`capitalize inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                      selectedAppointment.status
                    )}`}
                  >
                    {selectedAppointment.status || "pending"}
                  </span>
                </div>

                <div className="bg-[#fffaf7] border rounded-2xl p-4">
                  <p className="text-sm text-gray-500 mb-2">Payment</p>
                  <span
                    className={`capitalize inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadgeClass(
                      selectedAppointment.payment_status
                    )}`}
                  >
                    {selectedAppointment.payment_status || "unpaid"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <DetailBox
                  title="Refund Status"
                  value={selectedAppointment.refund_status || "N/A"}
                />

                <DetailBox title="Notes" value={selectedAppointment.notes} />

                <DetailBox
                  title="Fabric Details"
                  value={selectedAppointment.fabric_details}
                />

                <DetailBox
                  title="Design Preferences"
                  value={selectedAppointment.design_preferences}
                />

                <DetailBox
                  title="Alteration Details"
                  value={selectedAppointment.alteration_details}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closePopup}
                  className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FullCalendar Custom CSS */}
      <style>
        {`
          .fc {
            font-family: inherit;
          }

          .fc .fc-toolbar {
            gap: 12px;
            flex-wrap: wrap;
          }

          .fc .fc-toolbar-title {
            font-size: 1.4rem;
            font-weight: 700;
          }

          .fc .fc-button {
            background: #111827;
            border: none;
            border-radius: 10px;
            padding: 8px 12px;
            text-transform: capitalize;
          }

          .fc .fc-button:hover {
            background: #374151;
          }

          .fc .fc-button-primary:not(:disabled).fc-button-active {
            background: #db2777;
          }

          .fc .fc-button-primary:disabled {
            background: #6b7280;
            opacity: 0.8;
          }

          .fc .fc-event {
            cursor: pointer;
            border: none;
            background: #db2777;
          }

          .fc .fc-event:hover {
            background: #be185d;
          }

          .fc .fc-daygrid-day-number {
            color: #111827;
            font-weight: 600;
          }

          .fc .fc-col-header-cell-cushion {
            color: #111827;
            font-weight: 700;
          }

          @media (max-width: 767px) {
            .fc .fc-toolbar {
              flex-direction: column;
              align-items: stretch;
            }

            .fc .fc-toolbar-chunk {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 8px;
            }

            .fc .fc-toolbar-title {
              font-size: 1.5rem;
              text-align: center;
              line-height: 1.2;
            }

            .fc .fc-button {
              font-size: 0.9rem;
              padding: 8px 12px;
            }

            .fc .fc-list {
              border-radius: 16px;
              overflow: hidden;
            }

            .fc .fc-list-event-title,
            .fc .fc-list-event-time {
              font-size: 0.9rem;
            }

            .fc .fc-list-day-cushion {
              background: #fff1f2;
              color: #111827;
              font-weight: 700;
            }
          }
        `}
      </style>
    </div>
  );
}

function DetailBox({ title, value }) {
  return (
    <div className="border rounded-2xl p-4">
      <p className="font-bold mb-2">{title}</p>
      <p className="text-gray-600 break-words whitespace-pre-line">
        {value || "N/A"}
      </p>
    </div>
  );
}

export default AdminCalendar;