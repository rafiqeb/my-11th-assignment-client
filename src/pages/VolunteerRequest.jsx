import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import axios from "axios";


const VolunteerRequest = () => {
    const { user } = useContext(AuthContext)
    const [request, setRequest] = useState([])

    useEffect(() => {
        const fetchAllData = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/volunteer-request/${user?.email}`)
            setRequest(data)
        }
        fetchAllData()
    }, [])

    return (
        <div>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-center mt-16">Manage My Request post</h2>
            </div>
            <div className="max-w-5xl mx-auto bg-base-200 rounded-lg mt-8">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Organization</th>
                                <th>Organizer name and email</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Requested name and email</th>
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
                                            <p>{item.organizer_name}</p>
                                            <p>{item.organizer_email}</p>
                                        </td>
                                        <td className="text-blue-600">{item.category}</td>
                                        <td className="text-green-500">{item.status}</td>
                                        <td>
                                            <p>{item.name}</p>
                                            <p>{item.email}</p>
                                        </td>
                                        <td>
                                            <button className="btn">Cancel</button>
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