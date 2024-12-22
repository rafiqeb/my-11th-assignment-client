import { useContext, useState } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddVolenter = () => {
    const { user } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const thumbnail = form.thumbnail.value;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const volunteer = form.volunteer.value;
        const deadline = form.deadline.value;
        const email = form.email.value;
        console.log({thumbnail, title, description, category, location, volunteer, deadline, email})
    }
    return (
        <div>
            <h2 className="text-3xl font-bold text-center mt-5 mb-4">Add Volunteer</h2>
            <div className="p-10 max-w-4xl mx-auto bg-slate-200 shadow-xl rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold">Thumbnail:</h3>
                            <input type="text" name="thumbnail" placeholder="logo url"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Post title:</h3>
                            <input type="text" name="title" placeholder="title"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Description:</h3>
                            <input type="text" name="description" placeholder="discription"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Category:</h3>
                            <select className="px-4 py-2 rounded-lg w-full border border-blue-300" name="category">
                                <option disabled selected>category</option>
                                <option>Healthcare</option>
                                <option>Education</option>
                                <option>Social service</option>
                            </select>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Location:</h3>
                            <input type="text" name="location" placeholder="location"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">No. of volunteers:</h3>
                            <input type="text" name="volunteer" placeholder="volunteer"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Deadline:</h3>
                            <DatePicker 
                            type='text' name="deadline" placeholderText='date'
                            className="px-4 py-2 rounded-lg w-full border border-blue-300">
                            </DatePicker>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">User email:</h3>
                            <input type="email" name="email" placeholder="User email" defaultValue={user?.email}
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                    </div>
                    <input type="submit" value="Submit" className="px-4 py-1 w-full rounded-full bg-orange-400 mt-8 font-bold text-white" />
                </form>
            </div>
        </div>
    );
};

export default AddVolenter;