import { Link } from "react-router-dom";


const Card = ({ card }) => {

    const { _id, title, thumbnail, description, category, location, volunteer, deadline } = card

    return (
        <div className="transition-transform duration-300 hover:scale-105">
            <div className="card bg-base-300 shadow-xl hover:bg-red-500 transition-colors duration-300">
                <div className="flex gap-4 items-center justify-center mt-6">
                    <figure>
                        <img
                            className="w-20 h-20 rounded-full"
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
                        <Link to={`/details/${_id}`}>
                            <button className="btn btn-outline border-0 border-b-2 border-orange-400 bg-slate-200 mt-6">View Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;