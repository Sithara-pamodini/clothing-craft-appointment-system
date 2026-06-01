<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentConfirmedNotification extends Notification
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
            ->subject('Your Appointment Has Been Confirmed - Nilu Fashion')
            ->greeting('Hello ' . ($this->appointment->customer_name ?? 'Customer') . ',')
            ->line('Your appointment has been confirmed by Nilu Fashion.')
            ->line('Service: ' . ($this->appointment->service->name ?? 'N/A'))
            ->line('Date: ' . ($this->appointment->appointment_date ?? 'N/A'))
            ->line('Time: ' . ($this->appointment->appointment_time ?? 'N/A'))
            ->line('Please arrive on time for your appointment.')
            ->line('Thank you for booking with Nilu Fashion.')
            ->salutation('Nilu Fashion Appointment System');
    }
}