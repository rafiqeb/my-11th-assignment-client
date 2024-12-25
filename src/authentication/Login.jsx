import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const Login = () => {
    const { signInWithGoogle, signIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;

        try {
            await signIn(email, password)
            Swal.fire({
                title: 'Success!',
                text: 'Login successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            navigate('/')
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                toast.success('Signin Successful')
                navigate('/')
            })
            .catch(error => {
                toast.error(error?.message)
            })
    }

    return (
        <div>
            <Helmet><title>Sign in page</title></Helmet>
            <div>
                <h2 className="text-3xl font-bold text-center mt-6">Login your account</h2>
                <div className="max-w-lg mx-auto bg-base-200 p-10 shadow-xl rounded-xl">
                    <form onSubmit={handleLogin}>
                        <button type="button"
                            onClick={handleGoogleLogin}
                            className="px-4 py-2 rounded-lg w-full border border-blue-300 flex justify-center items-center gap-6">
                            <p className="text-2xl"><FcGoogle /></p>
                            <h4 className="font-semibold">Login with Google</h4>
                        </button>
                        <div>
                            <h3 className="text-lg font-semibold mt-4">Email:</h3>
                            <input type="email" name="email" placeholder="email"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mt-4">Password:</h3>
                            <input type="password" name="password" placeholder="password"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                            <p className="text-sm">Forgot Password?</p>
                        </div>
                        <div>
                            <input type="submit" value="Login" className="px-4 py-2 rounded-lg w-full bg-blue-700 text-white font-semibold mt-6" />
                        </div>
                        <p className="text-center mt-6">
                            Dont have an account? <Link className="text-blue-700 font-bold" to='/register'>Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;