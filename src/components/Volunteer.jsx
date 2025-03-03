import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Volunteer = () => {
    const [volunteers, setVolunteers] = useState([])
    const data = useLoaderData()

    useEffect(() => {
        const sorted = [...data].sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
        setVolunteers(sorted.slice(0, 6))
    }, [data])

    return (
        <div className="mt-16">
            <div>
                <h1 className="text-3xl font-bold text-center">Volunteer Needs</h1>
                <p className="text-lg font-semibold max-w-xl mx-auto text-center mt-3 mb-6">A volunteer website connects individuals with opportunities to make a positive impact in their communities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
                {
                    volunteers.map(item => <Card key={item._id} card={item}></Card>)
                }
            </div>
            <div className="ml-4 mt-6">
                <Link to='/volentear'>
                    <button className="btn btn-warning">See All Volunteers</button>
                </Link>
            </div>
        </div>
    );
};

export default Volunteer;