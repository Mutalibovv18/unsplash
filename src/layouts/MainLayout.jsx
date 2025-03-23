import { Outlet } from "react-router-dom";

// components
import { Navbar, Footer } from "../components";

function Mainlayout() {
    return (
        <>
        <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>

    )
}

export default Mainlayout