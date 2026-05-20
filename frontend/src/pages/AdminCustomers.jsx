import { useEffect, useState } from "react";
import api from "../services/api";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading customers:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Manage Customers
      </h1>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600">Loading customers...</p>
        </div>
      ) : customers.length === 0 ? (
        <p className="text-gray-600">No customers found.</p>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border border-gray-200 table-fixed">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-3 text-left w-[30%]">Name</th>
                  <th className="p-3 text-left w-[50%]">Email</th>
                  <th className="p-3 text-left w-[20%]">Role</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-t">
                    <td className="p-3 align-middle break-words">
                      {customer.name}
                    </td>
                    <td className="p-3 align-middle break-all">
                      {customer.email}
                    </td>
                    <td className="p-3 align-middle capitalize">
                      {customer.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <h3 className="font-bold text-lg mb-2 break-words">
                  {customer.name}
                </h3>

                <div className="text-sm space-y-1">
                  <p className="break-all">
                    <strong>Email:</strong> {customer.email}
                  </p>
                  <p className="capitalize">
                    <strong>Role:</strong> {customer.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminCustomers;