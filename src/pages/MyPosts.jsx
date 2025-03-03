import { useContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";



const MyPosts = () => {
    const { user } = useContext(AuthContext)

    const {data: myPosts = [], isPending: loading, refetch} = useQuery({
        queryKey: ['myPosts'],
        queryFn: async()=> {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-posts/${user?.email}`);
            return res.data
        }
    })

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
            <Helmet><title>My Volunteer Need Post</title></Helmet>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-center mt-16">Manage My volunteer need post</h2>
            </div>
            <div className="max-w-5xl mx-auto bg-base-200 rounded-lg mt-8">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Title</th>
                                <th>Deadline</th>
                                <th>Category</th>
                                <th>Organizer name and email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myPosts.map((item) => (
                                    <tr key={item._id}>
                                        <th>
                                            <img src={item.thumbnail} alt="" className="w-20 h-20 rounded-full" />
                                        </th>
                                        <td>{item.title}</td>
                                        <td>{item.deadline}</td>
                                        <td className="text-blue-600">{item.category}</td>
                                        <td>
                                            <p>{item.name}</p>
                                            <p>{item.email}</p>
                                        </td>
                                        <td>
                                            <Link to={`/updatePost/${item._id}`}>
                                                <button className="btn text-xl"><FaEdit /></button>
                                            </Link>
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