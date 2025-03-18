import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!values.email || !values.password || !isChecked) {
            setError('Please enter both email and password and agree to the terms.');
            return;
        }

        setLoading(true);
        axios.post('http://localhost:3000/auth/adminlogin', values)
            .then(result => {
                setLoading(false);
                if (result.data.loginStatus) {
                    localStorage.setItem("valid", true);
                    navigate('/dashboard');
                } else {
                    setError(result.data.Error);
                    console.log("You cannot!");
                }
            })
            .catch(err => {
                setLoading(false);
                console.error(err);
                setError('An unexpected error occurred. Please try again.');
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 p-4 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                            onChange={(e) => {
                                setValues({ ...values, email: e.target.value });
                                setError(null); 
                            }} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input type="password" name='password' placeholder='Enter Password'
                            onChange={(e) => {
                                setValues({ ...values, password: e.target.value });
                                setError(null); 
                            }} className='form-control rounded-0' />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2' disabled={loading}>
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                    <div className='mb-4'>
                        <input type="checkbox" name="tick" id="tick" className='me-2'
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)} />
                        <label htmlFor="tick">You agree with terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;