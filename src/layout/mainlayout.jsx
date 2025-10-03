import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"

const Mainlayout =()=>{

    return (
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}

export default Mainlayout