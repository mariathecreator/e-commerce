import { useEffect, useState } from "react";
import api from "../../global/Axios";

const Order = () => {
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get("/api/user/getorder");
                setOrder(res.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchOrder();
    }, [order]);

    const handleOrder = async (id) => {
        if (!window.confirm("Do you really want to cancel this order?")) return;
        try {
            const res = await api.put(`/api/user/deleteorder/${id}`, {})
            alert(res.data.message);
            setOrder(prevOrders =>
                prevOrders.map(o =>
                    o._id === id ? { ...o, delivery_status: "cancelled" } : o
                )
            );
        }
        catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "failed to cancel order")
        }
    }

    if (error) return (<div className="text-red-500 text-center mt-8"> Error: {error}</div>);

    if (!order || order.length === 0) return (<div className="text-white text-center mt-8">  No orders found. </div>);


    const getStatusBadge = (status) => {
        const baseStyle = "px-3 py-1 rounded-full text-sm font-semibold";
        switch (status) {
            case "delivered":
                return <span className={`${baseStyle} bg-green-100 text-green-700`}>{status}</span>;
            case "pending":
                return <span className={`${baseStyle} bg-yellow-100 text-yellow-700`}>{status}</span>;
            case "cancelled":
                return <span className={`${baseStyle} bg-red-100 text-red-700`}>{status}</span>;
            case "shipped":
                return <span className={`${baseStyle} bg-blue-100 text-blue-700`}>{status}</span>;
            default:
                return <span className={`${baseStyle} bg-gray-200 text-gray-700`}>{status}</span>;
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">
                Your Orders
            </h1>

            {order.map((cart, i) => (
                <div
                    key={i}
                    className="border rounded-lg p-4 mb-4 bg-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Order #{i + 1}
                        </h2>
                        {getStatusBadge(cart.delivery_status)}
                    </div>

                    <p className="mb-2 text-gray-600">
                        <strong>Total Amount:</strong> ${cart.total}
                    </p>

                    <h3 className="font-semibold text-gray-700 mt-3 mb-1">Items:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        {cart.items.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 mb-1">
                                <img
                                    src={item.image ? `http://localhost:3000/uploads/${item.image}` : '/placeholder.png'}
                                    alt={item.productname}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <span>
                                    {item.productname} x {item.quantity} — ${item.subtotal}
                                </span>
                            </li>
                        ))}
                    </ul>


                    {cart.delivery_status !== "Cancelled" && (
                        <button
                            onClick={() => handleOrder(cart._id)}
                            disabled={cart.delivery_status === "cancelled"}
                            className={`mt-3 px-3 py-1 rounded text-white ${cart.delivery_status === "cancelled"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                                }`}
                        >
                            Cancel Order
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Order;
