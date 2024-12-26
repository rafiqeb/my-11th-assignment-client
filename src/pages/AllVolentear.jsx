import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Card from "../components/Card";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import TableLayout from "../components/TableLayout";


const AllVolentear = () => {
    const [volunteers, setVolunteers] = useState([])
    const [filter, setFilter] = useState('')
    const [search, setSearch] = useState('')
    const [tableLayout, setTableLayout] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-volunteers?filter=${filter}&search=${search}`)
            setVolunteers(data)
        }
        fetchAllData()
    }, [filter, search])

    const handleToggle = () => {
        setTableLayout((prev) => !prev);
    };

    return (
        <div className="mt-10">
            <Helmet><title>All volunteers</title></Helmet>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16">
                <div>
                    <select onChange={(e) => setFilter(e.target.value)} name="filter" id="filter" className="btn btn-accent">
                        <option value="">Category</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Social service">Social service</option>
                    </select>
                </div>
                <div>
                    <div className="join">
                        <input onChange={(e) => setSearch(e.target.value)} className="input input-bordered join-item" placeholder="search" />
                        <button className="btn btn-accent join-item rounded-r-full">Search</button>
                    </div>
                </div>
                <button onClick={handleToggle} className="btn btn-accent">Change Layout</button>
            </div>
            {tableLayout ? (
                <div>
                    <TableLayout volunteers={volunteers}></TableLayout>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center p-2 mt-10">
                    {
                        volunteers.map(item => <Card key={item._id} card={item}></Card>)
                    }
                </div>
            )}
        </div>
    );
};

export default AllVolentear;