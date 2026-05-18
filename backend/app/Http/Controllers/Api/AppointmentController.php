<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

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
            'status' => 'nullable|string',
            'payment_status' => 'nullable|string',
        ]);

        if ($request->user()) {
            $validated['user_id'] = $request->user()->id;
        }

        $validated['status'] = 'pending';

        $appointment = Appointment::create($validated);

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
        $validated = $request->validate([
            'service_id' => 'sometimes|required|exists:services,id',
            'customer_name' => 'sometimes|required|string|max:255',
            'customer_email' => 'nullable|email',
            'customer_phone' => 'sometimes|required|string|max:20',
            'appointment_date' => 'sometimes|required|date',
            'appointment_time' => 'sometimes|required',
            'notes' => 'nullable|string',
            'status' => 'nullable|string',
            'payment_status' => 'nullable|string',
        ]);

        $appointment->update($validated);

        return response()->json([
            'message' => 'Appointment updated successfully',
            'appointment' => $appointment->load(['user', 'service']),
        ]);
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return response()->json([
            'message' => 'Appointment deleted successfully',
        ]);
    }
}