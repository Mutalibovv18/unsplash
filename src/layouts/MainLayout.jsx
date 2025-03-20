import { Outlet } from "react-router-dom";

// components
import { Navbar } from "../components";

function Mainlayout() {
    return (
        <>
        <Navbar />
            <main>
                <Outlet />
            </main>
        </>

    )
}

export default Mainlayout