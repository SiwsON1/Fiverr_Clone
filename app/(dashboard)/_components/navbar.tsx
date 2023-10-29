import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebard"

export const Navbar = () => {
    return (
        <div className=" border-b h-full flex items-center bg-white shadow-sm">
<MobileSidebar />
<NavbarRoutes />
        </div>
    )
}