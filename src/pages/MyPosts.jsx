import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";


const MyPosts = () => {
    const { user } = useContext(AuthContext)
    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        fetchAllData()
    }, [])

    const fetchAllData = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/my-posts/${user?.email}`)
        setMyPosts(data)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`${import.meta.env.VITE_API_URL}/volunteers/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your review has been deleted.",
                                icon: "success"
                            });
                            const remainingPost = myPosts.filter(post => post._id !== id)
                            setMyPosts(remainingPost)
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="max-w-4xl mx-auto bg-base-200 rounded-lg">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Title</th>
                                <th>Deadline</th>
                                <th>Organizer name and email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myPosts.map((item) => (
                                    <tr key={item._id}>
                                        <th>
                                            <img src={item.thumbnail} alt="" className="w-20 rounded-full" />
                                        </th>
                                        <td>{item.title}</td>
                                        <td>{item.deadline}</td>
                                        <td>
                                            <p>{item.name}</p>
                                            <p>{item.email}</p>
                                        </td>
                                        <td>
                                            <button className="btn text-xl"><FaEdit /></button>
                                            <button onClick={() => handleDelete(item._id)} className="btn text-xl"><MdDeleteForever /></button>
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

export default MyPosts;