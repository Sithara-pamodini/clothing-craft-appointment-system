import { useEffect, useState } from "react";
import api from "../services/api";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error loading customers:", error);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">
        Manage Customers
      </h1>

      {customers.length === 0 ? (
        <p className="text-gray-600">No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-zinc-900 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t">
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminCustomers;