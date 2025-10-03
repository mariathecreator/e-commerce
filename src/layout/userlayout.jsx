import { Outlet } from "react-router-dom"
import Usernavbar from "../components/userhome/usernav"

const Userlayout=()=>{

    return(
        <>
        <Usernavbar/>
        <Outlet/>
        </>
    )
}

export default Userlayout