# Clothing Craft Appointment System - Testing Documentation

## 1. Manual Testing

Manual testing was carried out by checking each module through the browser and verifying that the expected result was displayed.

### Authentication Testing

| Test Case | Expected Result | Status |
|---|---|---|
| Register customer | Customer account should be created | Passed |
| Login customer | Customer should access customer pages | Passed |
| Login admin | Admin should access admin dashboard | Passed |
| Logout user | User should be logged out successfully | Passed |
| Customer access admin route | Access should be restricted | Passed |

### Service Module Testing

| Test Case | Expected Result | Status |
|---|---|---|
| Add service | Service should be saved | Passed |
| Edit service | Service should update | Passed |
| Delete service | Service should be removed | Passed |
| View services | Services should display on public page | Passed |

### Appointment Module Testing

| Test Case | Expected Result | Status |
|---|---|---|
| Customer book appointment | Appointment should be created | Passed |
| Guest book appointment | Appointment should be created without login | Passed |
| Admin add walk-in appointment | Appointment should be created | Passed |
| Customer view own appointments | Only customer appointments should display | Passed |
| Admin view all appointments | All appointments should display | Passed |
| Customer edit appointment | Appointment update request should save | Passed |
| Customer cancel appointment | Appointment status should become cancelled | Passed |
| Admin edit appointment | Appointment details should update | Passed |
| Admin delete appointment | Appointment should be deleted | Passed |

### Payment and Refund Testing

| Test Case | Expected Result | Status |
|---|---|---|
| Admin update payment status | Payment status should update | Passed |
| Customer request refund | Refund status should become requested | Passed |
| Admin update refund status | Refund status should update | Passed |

### Reporting Testing

| Test Case | Expected Result | Status |
|---|---|---|
| View report summary | Report cards should display correct counts | Passed |
| View appointments by service | Service report should display | Passed |
| View monthly appointment trends | Monthly report should display | Passed |
| View customer preferences | Preferred services should display | Passed |

### Staff Availability Testing

| Test Case | Expected Result | Status |
|---|---|---|
| Update staff availability | Availability status should update | Passed |
| View availability on dashboard | Availability count should display | Passed |

## 2. Unit Testing Summary

Individual modules were tested separately to verify that each feature works correctly. Authentication, services, appointments, customers, reports, refund handling, and staff availability were tested independently.

## 3. Integration Testing Summary

Integration testing was performed to confirm that the frontend, backend API, authentication, and database communicate correctly. Axios requests were tested with Laravel API endpoints and MySQL data storage.

## 4. System Testing Summary

End-to-end system testing was completed by testing full user flows such as registration, login, booking appointments, managing appointments, requesting refunds, viewing reports, and updating staff availability.

## 5. User Acceptance Testing Summary

The system was tested from both customer and admin perspectives. The completed features match the proposed project scope, including appointment booking, service management, appointment management, reporting, payment status tracking, refund handling, and staff availability.