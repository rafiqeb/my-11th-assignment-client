import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Card from "../components/Card";


const AllVolentear = () => {
    const [volunteers, setVolunteers] = useState([])
    const data = useLoaderData()

    useEffect(() => {
        const newData = [...data]
        setVolunteers(newData)
    }, [data])


    return (
        <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center p-2">
                {
                    volunteers.map(item => <Card key={item._id} card={item}></Card>)
                }
            </div>
        </div>
    );
};

export default AllVolentear;