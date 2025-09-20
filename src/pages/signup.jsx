import { useState } from "react";
import api from "../global/Axios";

const Sign = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res=await api.post("/register",{name,email,password})

            console.log("Response:", res.data);
            setName("")
            setEmail("")
            setPassword("")
            setMessage("registered successfully")
        }
        catch (err) {
            console.error(err.response?.data?.message || err)
            setMessage("registeration failed" + (err.response?.data?.message || "unknown error"))
        }
    }

    return (
        <div className="bg-black text-white mt-10 w-auto h-auto">
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={name} placeholder="name" className="p-5" onChange={(e) => setName(e.target.value)} />
                    <input type="email" name="name" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="name" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Submit</button>
                </form></div>
            {message && (<p>{message}</p>)}
        </div>
    )

}
export default Sign