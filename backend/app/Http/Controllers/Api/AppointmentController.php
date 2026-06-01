<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Notifications\AppointmentConfirmedNotification;
use App\Notifications\NewBookingReceivedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user && $user->role === 'admin') {
            $appointments = Appointment::with(['user', 'service'])
                ->latest()
                ->get();
        } else {
            $appointments = Appointment::with(['user', 'service'])
                ->where('user_id', $user->id)
                ->latest()
                ->get();
        }

        return response()->json($appointments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'nullable|email',
            'customer_phone' => 'required|string|max:20',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
            'notes' => 'nullable|string',

            'fabric_details' => 'nullable|string',
            'design_preferences' => 'nullable|string',
            'alteration_details' => 'nullable|string',

            'status' => 'nullable|string',
            'payment_status' => 'nullable|string',
            'refund_status' => 'nullable|string',
        ]);

        if ($request->user()) {
            $validated['user_id'] = $request->user()->id;
        }

        $validated['status'] = $validated['status'] ?? 'pending';
        $validated['payment_status'] = $validated['payment_status'] ?? 'unpaid';

        $appointment = Appointment::create($validated);

        try {
            Notification::route('mail', env('ADMIN_EMAIL'))
                ->notify(new NewBookingReceivedNotification($appointment->load(['user', 'service'])));
        } catch (\Exception $e) {
            \Log::error('Admin booking email failed: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Appointment created successfully',
            'appointment' => $appointment->load(['user', 'service']),
        ], 201);
    }

    public function show(Request $request, Appointment $appointment)
    {
        $user = $request->user();

        if ($user->role !== 'admin' && $appointment->user_id !== $user->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        return response()->json($appointment->load(['user', 'service']));
    }

    public function update(Request $request, Appointment $appointment)
    {
        $oldStatus = $appointment->status;

        $validated = $request->validate([
            'service_id' => 'sometimes|required|exists:services,id',
            'customer_name' => 'sometimes|required|string|max:255',
            'customer_email' => 'nullable|email',
            'customer_phone' => 'sometimes|required|string|max:20',
            'appointment_date' => 'sometimes|required|date',
            'appointment_time' => 'sometimes|required',
            'notes' => 'nullable|string',

            'fabric_details' => 'nullable|string',
            'design_preferences' => 'nullable|string',
            'alteration_details' => 'nullable|string',

            'status' => 'nullable|string',
            'payment_status' => 'nullable|string',
            'refund_status' => 'nullable|string',
        ]);

        $appointment->update($validated);
        $appointment->load(['user', 'service']);

        if (
            $oldStatus !== 'confirmed' &&
            ($appointment->status === 'confirmed') &&
            !empty($appointment->customer_email)
        ) {
            try {
                Notification::route('mail', $appointment->customer_email)
                    ->notify(new AppointmentConfirmedNotification($appointment));
            } catch (\Exception $e) {
                \Log::error('Customer confirmation email failed: ' . $e->getMessage());
            }
        }

        return response()->json([
            'message' => 'Appointment updated successfully',
            'appointment' => $appointment,
        ]);
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return response()->json([
            'message' => 'Appointment deleted successfully',
        ]);
    }

    public function summaryReport()
    {
        $totalAppointments = Appointment::count();
        $pendingAppointments = Appointment::where('status', 'pending')->count();
        $confirmedAppointments = Appointment::where('status', 'confirmed')->count();
        $completedAppointments = Appointment::where('status', 'completed')->count();
        $cancelledAppointments = Appointment::where('status', 'cancelled')->count();

        $paidAppointments = Appointment::where('payment_status', 'paid')->count();
        $unpaidAppointments = Appointment::where('payment_status', 'unpaid')->count();
        $refundRequests = Appointment::where('refund_status', 'requested')->count();

        $appointmentsByService = Appointment::with('service')
            ->selectRaw('service_id, COUNT(*) as total')
            ->groupBy('service_id')
            ->get()
            ->map(function ($item) {
                return [
                    'service_name' => $item->service->name ?? 'N/A',
                    'total' => $item->total,
                ];
            });

        $monthlyAppointments = Appointment::selectRaw('MONTH(appointment_date) as month, COUNT(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $customerPreferences = Appointment::with('service')
            ->selectRaw('service_id, COUNT(*) as total')
            ->groupBy('service_id')
            ->orderByDesc('total')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'service_name' => $item->service->name ?? 'N/A',
                    'total' => $item->total,
                ];
            });

        return response()->json([
            'total_appointments' => $totalAppointments,
            'pending_appointments' => $pendingAppointments,
            'confirmed_appointments' => $confirmedAppointments,
            'completed_appointments' => $completedAppointments,
            'cancelled_appointments' => $cancelledAppointments,
            'paid_appointments' => $paidAppointments,
            'unpaid_appointments' => $unpaidAppointments,
            'refund_requests' => $refundRequests,
            'appointments_by_service' => $appointmentsByService,
            'monthly_appointments' => $monthlyAppointments,
            'customer_preferences' => $customerPreferences,
        ]);
    }
}