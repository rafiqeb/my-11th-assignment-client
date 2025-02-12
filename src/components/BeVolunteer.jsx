import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../authentication/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet-async";


const BeVolunteer = () => {
    const { user } = useContext(AuthContext)
    const data = useLoaderData()
    const navigate = useNavigate()

    const { _id, title, thumbnail, description, category, location, volunteer, name, email, deadline } = data

    const [startDate, setStartDate] = useState(deadline);

    const handleRequest = async (e) => {
        e.preventDefault();
        const form = e.target;
        const volunteer_name = form.volunteer_name.value;
        const volunteer_email = form.volunteer_email.value;
        const suggestion = form.suggestion.value;
        const status = form.status.value;
        const postId = _id

        const currentDate = new Date();
        const [month, day, year] = deadline.split("/");
        const deadlineDate = new Date(year, month - 1, day);

        // chack volunteer need and request parmision
        if (user?.email === email) return toast.error('Action not permited')

        // conditional
        if (currentDate > deadlineDate) return toast.error('Deadline allready cross')

        const requestData = { name: volunteer_name, email: volunteer_email, suggestion, status, postId, thumbnail, title, category, organizer_name: name, organizer_email: email };

        //  try catch axios
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/add-request`, requestData)
            toast.success('Request added successfully')
            navigate('/myPosts')
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div>
            <Helmet><title>Volunteer Request</title></Helmet>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-center mt-16">Volunteer Request</h2>
            </div>
            <div className="p-10 max-w-4xl mx-auto bg-slate-200 shadow-xl rounded-lg">
                <form onSubmit={handleRequest}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold">Thumbnail:</h3>
                            <input type="text" name="thumbnail" defaultValue={thumbnail} placeholder="logo url" readOnly
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Post title:</h3>
                            <input type="text" name="title" placeholder="title" defaultValue={title}
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" readOnly />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Description:</h3>
                            <input type="text" name="description" placeholder="discription" defaultValue={description} readOnly
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Category:</h3>
                            <select className="px-4 py-2 rounded-lg w-full border border-blue-300" name="category" defaultValue={category} readOnly>
                                <option disabled selected>category</option>
                                <option>Healthcare</option>
                                <option>Education</option>
                                <option>Social service</option>
                            </select>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Location:</h3>
                            <input type="text" name="location" placeholder="location" defaultValue={location} readOnly
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">No. of volunteers:</h3>
                            <input type="number" name="volunteer" placeholder="volunteer" defaultValue={volunteer} readOnly
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Organizer name:</h3>
                            <input type="text" name="name" placeholder="Organizer name" defaultValue={name} readOnly
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Organizer email:</h3>
                            <input type="email" name="email" placeholder="User email" defaultValue={email} readOnly
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Deadline:</h3>
                            <DatePicker
                                type='text' name="deadline" readOnly
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                className="px-4 py-2 rounded-lg w-full border border-blue-300">
                            </DatePicker>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div>
                            <h3 className="text-lg font-semibold">User name:</h3>
                            <input type="text" name="volunteer_name" placeholder="Organizer name" readOnly defaultValue={user?.displayName}
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">User email:</h3>
                            <input type="email" name="volunteer_email" placeholder="User email" defaultValue={user?.email} readOnly
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Suggestion:</h3>
                            <input type="text" name="suggestion" placeholder="suggestion"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Status:</h3>
                            <input type="text" name="status" placeholder="status" defaultValue={'requested'} readOnly
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                    </div>
                    <input type="submit" value="Request" className="px-4 py-1 w-full rounded-full bg-orange-400 mt-8 font-bold text-white" />
                </form>
            </div>
        </div>
    );
};

export default BeVolunteer;