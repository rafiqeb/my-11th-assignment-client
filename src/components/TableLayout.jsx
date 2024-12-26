import { Link } from "react-router-dom";


const TableLayout = ({ volunteers }) => {
    return (
        <div>
            <div className="bg-base-200 rounded-lg mt-8">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Deadline</th>
                                <th>Category</th>
                                <th>Organizer name and email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                volunteers.map((item) => (
                                    <tr key={item._id}>
                                        <th>
                                            <img src={item.thumbnail} alt="" className="w-20 h-20 rounded-full" />
                                        </th>
                                        <td>{item.title}</td>
                                        <td>{item.location}</td>
                                        <td>{item.deadline}</td>
                                        <td className="text-blue-600">{item.category}</td>
                                        <td>
                                            <p>{item.name}</p>
                                            <p>{item.email}</p>
                                        </td>
                                        <td>
                                            <Link to={`/details/${item._id}`}>
                                                <button className="btn btn-primary">View Details</button>
                                            </Link>
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

export default TableLayout;