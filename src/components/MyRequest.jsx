import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import axios from "axios";


const MyRequest = () => {
    const { user } = useContext(AuthContext)
    const [request, setRequest] = useState([])

    useEffect(() => {
        fetchAllData()
    }, [])

    const fetchAllData = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/add-request/${user?.email}`)
        setRequest(data)
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mt-10">Manage My volunteer request post</h2>
            <div className="max-w-4xl mx-auto bg-base-200 rounded-lg mt-8">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Category</th>
                                <th>Requested name and email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                request.map((item) => (
                                    <tr key={item._id}>
                                        <th>
                                            <img src={item.thumbnail} alt="" className="w-20 rounded-full" />
                                        </th>
                                        <td>{item.title}</td>
                                        <td className="text-green-500">{item.status}</td>
                                        <td className="text-blue-600">{item.category}</td>
                                        <td>
                                            <p>{item.name}</p>
                                            <p>{item.email}</p>
                                        </td>
                                        {/* <td>
                                            <Link to={`/updatePost/${item._id}`}>
                                                <button className="btn text-xl"><FaEdit /></button>
                                            </Link>
                                            <button onClick={() => handleDelete(item._id)} className="btn text-xl"><MdDeleteForever /></button>
                                        </td> */}
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

export default MyRequest;