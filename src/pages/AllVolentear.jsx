import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Card from "../components/Card";
import { Helmet } from "react-helmet-async";
import axios from "axios";


const AllVolentear = () => {
    const [volunteers, setVolunteers] = useState([])
    const [filter, setFilter] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchAllData = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-volunteers?filter=${filter}&search=${search}`)
            setVolunteers(data)
        }
        fetchAllData()
    }, [filter, search])
    
    return (
        <div className="mt-10">
            <div className="flex justify-center items-center gap-16">
                <div>
                    <select onChange={(e) => setFilter(e.target.value)} name="filter" id="filter" className="border p-4 rounded-lg">
                        <option value="">Category</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Social service">Social service</option>
                    </select>
                </div>
                <div>
                    <div className="join">
                        <input onChange={(e)=> setSearch(e.target.value)} className="input input-bordered join-item" placeholder="search" />
                        <button className="btn btn-error join-item rounded-r-full">Search</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center p-2 mt-10">
                {
                    volunteers.map(item => <Card key={item._id} card={item}></Card>)
                }
            </div>
            <Helmet><title>All volunteers</title></Helmet>
        </div>
    );
};

export default AllVolentear;