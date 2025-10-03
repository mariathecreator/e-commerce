import { useEffect, useState } from "react"
import api from "../../global/Axios"

const Order = () => {
    const [order, setOrder] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get('/user/getorder')
                setOrder(res.data)
            }
            catch (err) {
                setError(err.message)
            }
        }
        fetchOrder()
    }, [])

    if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
    if (!order || order.length === 0) return <div className="text-white text-center mt-8">No orders found.</div>;
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
            {order.map((cart, i) => (
                <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">Order {i + 1}</h2>
                    <p className="mb-2">Total Amount: ${cart.total}</p>
                    <p className="mb-2">Order Status: {cart.delivery_status}</p>

                    <h3 className="font-semibold">Items:</h3>
                    <ul className="list-disc list-inside">
                        {cart.items.map((item, index) => (
                            <li key={index}>
                                {item.productname}*{item.quantity} - ${item.subtotal}
                            </li>
                        ))}
                    </ul>

                </div>


            ))}
        </div>
    )

}

export default Order