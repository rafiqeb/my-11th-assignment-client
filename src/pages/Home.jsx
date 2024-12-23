import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";


const Home = () => {
    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold text-center mt-8">Care Bridge</h1>
                <p className="text-lg font-semibold max-w-xl mx-auto text-center mt-3 mb-6">A platform dedicated to connecting passionate volunteers with impactful opportunities to make a difference in their communities and beyond. Join us to contribute your time and skills towards meaningful causes and foster positive change in the world.</p>
            </div>
            <Banner></Banner>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;