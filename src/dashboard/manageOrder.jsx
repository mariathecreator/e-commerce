import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../global/Axios"

const Adminorder = () => {
    const [order, setOrder] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get('/admin/getorder')
                setOrder(res.data)
            }
            catch (err) {
                setError(err.message)
            }
        }
        fetchOrder()
    }, [])

    const updateorder = async (orderid, status) => {
        try {
            const res = await api.put(`/admin/updateorder/${orderid}`, { delivery_status: status })
            setOrder((prev) => prev.map((ord) => (ord._id === orderid ? { ...ord, delivery_status: status } : ord)))
        }
        catch (err) {
            setError(err.message)
        }
    }

    if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
    if (!order || order.length === 0) return <div className="text-white text-center mt-8">No orders found.</div>;
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
            {order.map((cart, i) => (
                <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">Order {i + 1}</h2>
                    <h3>User: {cart.user?.name}</h3>
                    <h3>email: {cart.user?.email}</h3>
                    <h3 className="font-semibold">Items:</h3>
                    <ul className="list-disc list-inside">
                        {cart.items.map((item, index) => (
                            <li className="ml-2" key={index}>
                                <p>Prodcut: {item.productname}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.subtotal}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-2">
                        <p className="mb-2">Total Amount: ${cart.total}</p>
                        <p className="mb-2">Order Status: {cart.delivery_status}</p>
                    </div>
                     <button
                        onClick={() => updateorder(cart._id, "pending")}
                        className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => updateorder(cart._id, "shipped")}
                        className="px-2 py-1 bg-orange-500 text-white rounded mr-2"
                    >
                        Shipped
                    </button>
                    <button
                        onClick={() => updateorder(cart._id, "delivered")}
                        className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                    >
                        Delivered
                    </button>
                    <button
                        onClick={() => updateorder(cart._id, "cancelled")}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                        Cancel
                    </button>
                </div>

            ))}
        </div>
    )

}

export default Adminorder