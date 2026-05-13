import { useEffect, useState } from "react";
import api from "../services/api";

function AppointmentForm() {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        service_id: "",
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        appointment_date: "",
        appointment_time: "",
        notes: "",
    });

    useEffect(() => {
        api.get("/services").then((response) => {
            setServices(response.data);
        });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/appointments", formData);
            alert("Appointment booked successfully!");

            setFormData({
                service_id: "",
                customer_name: "",
                customer_email: "",
                customer_phone: "",
                appointment_date: "",
                appointment_time: "",
                notes: "",
            });
        } catch (error) {
            console.error(error);
            alert("Failed to book appointment.");
        }
    };

    return (
        <div>
            <h1>Book Appointment</h1>

            <form onSubmit={handleSubmit}>
                <select name="service_id" value={formData.service_id} onChange={handleChange} required>
                    <option value="">Select Service</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>

                <input name="customer_name" placeholder="Customer Name" value={formData.customer_name} onChange={handleChange} required />
                <input name="customer_email" placeholder="Email" value={formData.customer_email} onChange={handleChange} />
                <input name="customer_phone" placeholder="Phone" value={formData.customer_phone} onChange={handleChange} required />
                <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required />
                <input type="time" name="appointment_time" value={formData.appointment_time} onChange={handleChange} required />
                <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange}></textarea>

                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
}

export default AppointmentForm;