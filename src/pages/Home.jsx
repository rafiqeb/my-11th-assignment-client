import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import { Helmet } from "react-helmet-async";




const Home = () => {
    return (
        <div>
            <Helmet><title>Home Page</title></Helmet>
            <div className="bg-base-100 py-16">
                <h1 className="text-4xl font-bold text-center mt-10">Care Bridge</h1>
                <p className="text-lg font-semibold max-w-xl mx-auto text-center mt-3">A platform dedicated to connecting passionate volunteers with impactful opportunities to make a difference in their communities and beyond. Join us to contribute your time and skills towards meaningful causes and foster positive change in the world.</p>
            </div>
            <Banner></Banner>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;