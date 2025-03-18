import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/employee/detail/' + id)
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.data);
                } else {
                    setError(result.data.Error);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError('Failed to fetch employee details');
                setLoading(false);
            });
    }, [id]);

    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <div className="p-3 text-center shadow-lg rounded bg-light">
                <h4 className="mb-4">Employee Data</h4>
                <img 
                    src={employee.image ? `http://localhost:3000/Images/${employee.image}` : 'fallback-image-url.jpg'} 
                    className='emp_det_image rounded-circle border' 
                    alt="Employee"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <div className='mt-4'>
                    <h3 className="text-primary">{employee.name || 'N/A'}</h3>
                    <h5 className="text-secondary">{employee.email || 'N/A'}</h5>
                    <h5 className="text-success">Salary: ${employee.salary || 'N/A'}</h5>
                </div>
                <div className="mt-4">
                    {/* <button className='btn btn-primary me-2' style={{ transition: '0.3s' }}>Edit Employee</button> */}
                    <button 
                        className='btn btn-danger' 
                        onClick={handleLogout}
                        style={{ transition: '0.3s' }}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;