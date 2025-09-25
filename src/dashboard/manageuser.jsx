


import api from "../global/Axios";
import { useEffect, useState } from "react";

const Userdata = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/getusers");
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const enableUser = async (id) => {
    try {
      await api.put(`/admin/userenable/${id}`);
      setData((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status: "Enable" } : user
        )
      );
    } catch (err) {
      console.error("Error enabling user:", err);
    }
  };

 
  const disableUser = async (id) => {
    try {
      await api.put(`/admin/userdisable/${id}`);
      setData((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status: "Disable" } : user
        )
      );
    } catch (err) {
      console.error("Error disabling user:", err);
    }
  };

  if (loading) return <div className="text-white text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  if (!data || data.length === 0)
    return <div className="text-white text-center mt-8">No users found.</div>;

  return (
    <div className="text-black p-4">
      <h3 className="text-2xl font-bold mb-4">Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-center text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id} className="border-t border-gray-600">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  {user.status ==="Enable" ? (
                    <span className="text-green-400 font-semibold">Enabled</span>
                  ) : (
                    <span className="text-red-400 font-semibold">Disabled</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {user.status==="Enable" ? (
                    <button
                      onClick={() => disableUser(user._id)}
                      className="px-4 py-1 rounded text-sm font-medium bg-red-500 hover:bg-red-600"
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      onClick={() => enableUser(user._id)}
                      className="px-4 py-1 rounded text-sm font-medium bg-green-500 hover:bg-green-600"
                    >
                      Enable
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userdata;
