import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


const VolunteerRequest = () => {
    const { user } = useContext(AuthContext)

    const {data: request = [], refetch} = useQuery({
        queryKey: ['request'],
        queryFn: async()=> {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/volunteer-request/${user?.email}`);
            return res.data
        }
    })

    const handleChange = async (id, prevStatus, status) => {
        try {
            const data = await axios.patch(`${import.meta.env.VITE_API_URL}/request-status/${id}`, {status})
            refetch()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-center mt-16">Volunteer Request post</h2>
            </div>
            <div className="max-w-5xl mx-auto bg-base-200 rounded-lg mt-8">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Organization</th>
                                <th>Requested name and email</th>
                                <th>Category</th>
                                <th>Suggestion</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                request.map((item) => (
                                    <tr key={item._id}>
                                        <th>
                                            <img src={item.thumbnail} alt="" className="w-20 h-20 rounded-full" />
                                        </th>
                                        <td>{item.title}</td>
                                        <td>
                                            <p>{item.name}</p>
                                            <p>{item.email}</p>
                                        </td>
                                        <td className="text-blue-600">{item.category}</td>
                                        <td>{item.suggestion}</td>
                                        <td className="text-green-500">{item.status}</td>
                                        <td>
                                            {item.status === 'Confirm' ? (<button disabled className="btn btn-primary btn-sm">Confirm</button>) : (<button onClick={()=> handleChange(item._id, item.status, 'Confirm')} className="btn btn-primary btn-sm">Confirm</button>)}    
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VolunteerRequest;