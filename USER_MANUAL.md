# Clothing Craft Appointment System - User Manual

## 1. Introduction

The Clothing Craft Appointment System is a full-stack web application developed to manage tailoring and clothing craft appointments. The system supports customer bookings, guest bookings, appointment management, reporting, refund handling, and staff availability management.

---

# 2. Customer Guide

## Customer Registration

1. Open the system.
2. Click Register.
3. Enter:
   - Name
   - Email
   - Password
4. Submit the form.

The customer account will be created successfully.

---

## Customer Login

1. Click Login.
2. Enter email and password.
3. Click Login.

The customer dashboard will become accessible.

---

## Book Appointment

1. Open the Appointment Booking page.
2. Select a service.
3. Enter:
   - Name
   - Email
   - Phone number
   - Date
   - Time
   - Notes
   - Fabric details
   - Design preferences
   - Alteration details
4. Submit the appointment.

The appointment will be created successfully.

---

## Guest Appointment Booking

Guest users can create appointments without registration or login.

Steps:
1. Open the booking page.
2. Fill the appointment form.
3. Submit the appointment.

The system stores the appointment as a guest booking.

---

## View My Appointments

1. Login as customer.
2. Open My Appointments.

The customer can:
- View appointments
- View appointment status
- View payment status
- View refund status

---

## Edit Appointment

1. Open My Appointments.
2. Click Edit Appointment.
3. Modify details.
4. Submit update request.

The appointment status becomes pending for admin review.

---

## Cancel Appointment

1. Open My Appointments.
2. Click Cancel Appointment.

The appointment status changes to cancelled.

---

## Request Refund

Refund requests are available for cancelled paid appointments.

Steps:
1. Open My Appointments.
2. Click Request Refund.
3. Enter refund reason.
4. Submit request.

The refund request status becomes requested.

---

# 3. Admin Guide

## Admin Login

1. Login using admin credentials.
2. Access the Admin Dashboard.

---

## Dashboard Features

The admin dashboard displays:
- Total appointments
- Total services
- Total customers
- Staff availability summary

---

## Manage Services

Admin can:
- Add services
- Edit services
- Delete services
- View all services

---

## Manage Appointments

Admin can:
- View all appointments
- Edit appointments
- Delete appointments
- Update appointment status
- Update payment status
- Update refund status

---

## Add Walk-in Appointment

Admin can create appointments for physical customers without customer login.

Steps:
1. Open Manage Appointments.
2. Click Add Appointment.
3. Fill appointment details.
4. Submit appointment.

---

## Manage Customers

Admin can:
- View all users
- View roles
- Update staff availability status

Availability options:
- Available
- Busy
- Unavailable

---

## Reports Module

The reports page displays:
- Total appointments
- Pending appointments
- Confirmed appointments
- Completed appointments
- Cancelled appointments
- Paid appointments
- Unpaid appointments
- Refund requests
- Appointments by service
- Monthly appointment trends
- Customer preferences

---

# 4. System Features

## Security Features

- Sanctum authentication
- Protected admin routes
- Customer appointment privacy
- Role-based authorization

---

## Responsive Design

The system supports:
- Desktop devices
- Tablets
- Mobile phones

---

# 5. Technologies Used

Frontend:
- React
- Vite
- Tailwind CSS

Backend:
- Laravel 12
- Sanctum Authentication

Database:
- MySQL

Other:
- Axios
- GitHub
- XAMPP

---

# 6. Conclusion

The Clothing Craft Appointment System successfully manages tailoring appointments, customer interactions, reporting, refund handling, and staff availability through a modern full-stack architecture.