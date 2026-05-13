<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        return response()->json(
            Appointment::with(['user', 'service'])->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
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

        $appointment = Appointment::create($validated);

        return response()->json([
            'message' => 'Appointment created successfully',
            'appointment' => $appointment->load(['user', 'service']),
        ], 201);
    }

    public function show(Appointment $appointment)
    {
        return response()->json($appointment->load(['user', 'service']));
    }

    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
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