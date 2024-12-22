import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            navbar
            <Outlet></Outlet>
            footer
        </div>
    );
};

export default MainLayout;