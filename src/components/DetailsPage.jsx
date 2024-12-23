import { Link, useLoaderData } from "react-router-dom";


const DetailsPage = () => {
    const data = useLoaderData()

    const { _id, title, thumbnail, description, category, location, volunteer, deadline } = data

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="card bg-base-300 shadow-xl max-w-xl p-4">
                <div className="flex gap-6 md:gap-16 items-center justify-center mt-4">
                    <figure>
                        <img
                            className="w-28 rounded-full"
                            src={thumbnail}
                            alt="Shoes" />
                    </figure>
                    <div>
                        <h3 className="text-2xl font-bold">{title}</h3>
                        <p className="font-semibold">{location}</p>
                    </div>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{category}</h2>
                    <p>{description}</p>
                    <div className="text-lg font-semibold mt-2 space-y-2">
                        <p>No. of volunteer: {volunteer}</p>
                        <p>Deadline: {deadline}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to='/beVolunteer'>
                            <button className="btn btn-warning">Be a Volunteer</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;