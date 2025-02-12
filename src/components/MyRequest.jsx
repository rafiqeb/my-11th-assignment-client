import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";


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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        })
            .then((result) => {
                if (result.isConfirmed) {

                    fetch(`${import.meta.env.VITE_API_URL}/add-request/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire({
                                    title: "Remove!",
                                    text: "Your review has been deleted.",
                                    icon: "success"
                                });
                                const remainingRequest = request.filter(post => post._id !== id)
                                setRequest(remainingRequest)
                            }
                        })
                }
            });
    }

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
                                            {item.status === 'Confirm' ? (<button disabled className="btn btn-outline btn-sm">Cancel</button>) : (<button onClick={() => handleDelete(item._id)} className="btn btn-outline btn-sm">Cancel</button>)}
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

export default MyRequest;