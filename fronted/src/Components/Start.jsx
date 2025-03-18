import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3000/verify')
            .then(result => {
                if (result.data.Status) {
                    if (result.data.role === "admin") {
                        navigate('/dashboard');
                    } else {
                        navigate('/employee_detail/' + result.data.id);
                    }
                } else {
                    console.log("User not verified");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [navigate]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 loginPage">
            <h1 className="welcome-message">Welcome!</h1>
            <div className="p-4 rounded w-50 w-md-50 w-lg-40 loginForm shadow-lg">
                <h2 className="text-center mb-4 font-weight-bold text-light">Login As</h2>
                <div className="d-flex justify-content-between mt-5 mb-2">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-lg btn-block hover-shadow" 
                        onClick={() => { navigate('/employee_login') }}
                    >
                        Employee
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-success btn-lg btn-block hover-shadow" 
                        onClick={() => { navigate('/adminlogin') }}
                    >
                        Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Start;