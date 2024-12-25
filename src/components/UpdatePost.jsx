import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'


const UpdatePost = () => {
    const navigate = useNavigate()
    const data = useLoaderData()

    const { _id, title, thumbnail, description, category, location, volunteer, name, email, deadline } = data

    const [startDate, setStartDate] = useState(deadline);

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const thumbnail = form.thumbnail.value;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const volunteer = parseInt(form.volunteer.value);
        const deadline = form.deadline.value;
        const name = form.name.value;
        const email = form.email.value;

        const updateData = { thumbnail, title, description, category, location, volunteer, deadline, name, email }

        fetch(`${import.meta.env.VITE_API_URL}/volunteers/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Update post successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    navigate('/myPosts')
                }
            })
    }
    return (
        <div>
            <h2 className="text-3xl font-bold text-center mt-5 mb-4">Update your post</h2>
            <div className="p-10 max-w-4xl mx-auto bg-slate-200 shadow-xl rounded-lg">
                <form onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold">Thumbnail:</h3>
                            <input type="text" name="thumbnail" defaultValue={thumbnail} placeholder="logo url"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Post title:</h3>
                            <input type="text" name="title" placeholder="title" defaultValue={title}
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Description:</h3>
                            <input type="text" name="description" placeholder="discription" defaultValue={description}
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Category:</h3>
                            <select className="px-4 py-2 rounded-lg w-full border border-blue-300" name="category" defaultValue={category}>
                                <option disabled selected>category</option>
                                <option>Healthcare</option>
                                <option>Education</option>
                                <option>Social service</option>
                            </select>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Location:</h3>
                            <input type="text" name="location" placeholder="location" defaultValue={location}
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">No. of volunteers:</h3>
                            <input type="number" name="volunteer" placeholder="volunteer" defaultValue={volunteer}
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
                                type='text' name="deadline"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                className="px-4 py-2 rounded-lg w-full border border-blue-300">
                            </DatePicker>
                        </div>
                    </div>
                    <input type="submit" value="Update post" className="px-4 py-1 w-full rounded-full bg-orange-400 mt-8 font-bold text-white" />
                </form>
            </div>
        </div>
    );
};

export default UpdatePost;