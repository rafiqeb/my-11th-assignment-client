import { Helmet } from 'react-helmet-async';
import image from '../assets/error.jpg'
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Helmet><title>Error Page</title></Helmet>
            <div className='flex justify-center items-center mt-10'>
                <img className='w-[480px] h-[480px]' src={image} alt="" />
            </div>
            <div className='flex justify-center items-center mt-4'>
                <button onClick={()=> navigate('/')} className='btn btn-warning'>Back Home</button>
            </div>
        </div>
    );
};

export default ErrorPage;