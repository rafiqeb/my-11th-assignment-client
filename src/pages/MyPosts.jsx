import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import MyRequest from "../components/myRequest";
import { Helmet } from "react-helmet-async";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { RiLayoutHorizontalFill } from "react-icons/ri";



const MyPosts = () => {
    const { user } = useContext(AuthContext)
    const [myPosts, setMyPosts] = useState([])
    const [tableLayout, setTableLayout] = useState(false);

    const handleToggle = () => {
        setTableLayout((prev) => !prev);
    };

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
            <Helmet><title>My Post and Request</title></Helmet>
            <div className="flex justify-center items-center gap-6 mt-6">
                <h2 className="text-3xl font-bold text-center">Manage My volunteer need post</h2>
                <button onClick={handleToggle} className="btn btn-warning text-3xl">{tableLayout ? (<TfiLayoutGrid3Alt/>) : (<RiLayoutHorizontalFill/>)}</button>
            </div>
            <div>
                {tableLayout ? (
                    <div className="max-w-4xl mx-auto bg-base-200 rounded-lg mt-8">
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
                ) : (
                    <div className="space-y-6 p-4 max-w-4xl mx-auto">
                        {
                            myPosts.map((item) => (<div key={item._id} className="flex flex-col md:flex-row gap-4 justify-between items-center bg-base-300 rounded-xl p-4">
                                <div className="flex items-center gap-6">
                                    <img className="w-40 h-40 rounded-xl" src={item.thumbnail} alt="" />
                                    <div>
                                        <h2 className="text-2xl font-bold">{item.title}</h2>
                                        <p className="font-semibold">{item.category}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">Organizer: {item.name}</p>
                                    <p>Email: {item.email}</p>
                                </div>
                                <div className="flex md:flex-col gap-5">
                                    <Link to={`/updatePost/${item._id}`}>
                                        <button className="btn text-xl"><FaEdit /></button>
                                    </Link>
                                    <button onClick={() => handleDelete(item._id)} className="btn text-xl"><MdDeleteForever /></button>
                                </div>
                            </div>))
                        }
                    </div>
                )}
            </div>
            <MyRequest></MyRequest>
        </div>
    );
};

export default MyPosts;