import { useEffect, useState } from "react";
import api from "../services/api";

function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        api.get("/services")
            .then((response) => {
                setServices(response.data);
            })
            .catch((error) => {
                console.error("Error loading services:", error);
            });
    }, []);

    return (
        <div>
            <h1>Tailoring Services</h1>

            {services.length === 0 ? (
                <p>No services found.</p>
            ) : (
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>
                            <strong>{service.name}</strong> - Rs. {service.price}
                            <br />
                            {service.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Services;