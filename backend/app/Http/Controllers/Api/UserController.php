<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function updateAvailability(Request $request, User $user)
    {
        $validated = $request->validate([
            'availability_status' => 'required|in:available,busy,unavailable',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Availability status updated successfully',
            'user' => $user,
        ]);
    }
}