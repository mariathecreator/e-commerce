import { useEffect, useState } from "react";
import api from "../global/Axios";

const Adminorder = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get("/api/admin/getorder");
            setOrders(res.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const updateOrder = async (orderId, status) => {
        try {
            await api.put(`/api/admin/updateorder/${orderId}`, { delivery_status: status });
            setOrders(prev =>
                prev.map(ord => (ord._id === orderId ? { ...ord, delivery_status: status } : ord))
            );
        } catch (err) {
            setError(err.message);
        }
    };

    // Determine which statuses should be disabled in the dropdown
    const getDisabledOptions = (currentStatus) => {
        return {
            pending: currentStatus === "shipped" || currentStatus === "delivered" || currentStatus === "cancelled",
            shipped: currentStatus === "delivered" || currentStatus === "cancelled",
            delivered: currentStatus === false

        };
    };

    if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
    if (!orders || orders.length === 0) return <div className="text-white text-center mt-8">No orders found.</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Order Management</h1>
            {orders.map((o, i) => {
                const disabledOptions = getDisabledOptions(o.delivery_status);
                const isDropdownDisabled = o.delivery_status === "cancelled" || o.delivery_status === "delivered";

                return (
                    <div key={o._id} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">Order {i + 1}</h2>
                        <h3>User: {o.user?.name}</h3>
                        <h3>Email: {o.user?.email}</h3>
                        <h3 className="font-semibold mt-2">Items:</h3>
                        <ul className="list-disc list-inside ml-4 mb-2">
                            {o.items.map((item, index) => {
                                    console.log(item.image)
                                    return (

                                        <li key={index} className="flex items-center gap-4 mb-2">
                                    <img
                                        src={item.image ? `http://localhost:3000/uploads/${item.image}` : '/placeholder.png'}
                                        alt={item.productname}
                                        className="w-16 h-16 object-cover rounded"
                                        />
                                    <div>
                                        <p className="font-semibold">{item.productname}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.subtotal}</p>
                                    </div>
                                </li>
                                    )
            })}
    
                        </ul>

                        <div className="mt-2">
                            <p className="mb-2">Total Amount: ${o.total}</p>
                            <p className="mb-2">Order Status: {o.delivery_status}</p>
                        </div>

                        <select
                            disabled={isDropdownDisabled}
                            value={o.delivery_status}
                            onChange={(e) => updateOrder(o._id, e.target.value)}
                            className={`px-3 py-1 rounded border ${isDropdownDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-blue-200"}`}
                        >
                            {["pending", "shipped", "delivered"].map((status) => (
                                <option key={status} value={status} disabled={disabledOptions[status]}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            })}
        </div>
    );
};

export default Adminorder;
