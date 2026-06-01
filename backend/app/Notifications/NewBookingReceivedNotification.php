<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewBookingReceivedNotification extends Notification
{
    use Queueable;

    protected $appointment;

    public function __construct(Appointment $appointment)
    {
        $this->appointment = $appointment;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Appointment Booking Received - Nilu Fashion')
            ->greeting('New booking received')
            ->line('A new appointment booking has been submitted.')
            ->line('Customer Name: ' . ($this->appointment->customer_name ?? 'N/A'))
            ->line('Customer Email: ' . ($this->appointment->customer_email ?? 'N/A'))
            ->line('Customer Phone: ' . ($this->appointment->customer_phone ?? 'N/A'))
            ->line('Service: ' . ($this->appointment->service->name ?? 'N/A'))
            ->line('Date: ' . ($this->appointment->appointment_date ?? 'N/A'))
            ->line('Time: ' . ($this->appointment->appointment_time ?? 'N/A'))
            ->line('Status: ' . ($this->appointment->status ?? 'pending'))
            ->line('Please log in to the admin panel to review and confirm this booking.')
            ->salutation('Nilu Fashion Appointment System');
    }
}