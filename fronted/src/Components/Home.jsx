import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          adminCount(),
          employeeCount(),
          salaryCount(),
          AdminRecords()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const AdminRecords = async () => {
    try {
      const result = await axios.get('http://localhost:3000/auth/admin_records');
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    } catch (error) {
      console.error('Error fetching admin records:', error);
      alert('Failed to fetch admin records');
    }
  };

  const adminCount = async () => {
    try {
      const result = await axios.get('http://localhost:3000/auth/admin_count');
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    } catch (error) {
      console.error('Error fetching admin count:', error);
    }
  };

  const employeeCount = async () => {
    try {
      const result = await axios.get('http://localhost:3000/auth/employee_count');
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    } catch (error) {
      console.error('Error fetching employee count:', error);
    }
  };

  const salaryCount = async () => {
    try {
      const result = await axios.get('http://localhost:3000/auth/salary_count');
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp);
      } else {
        alert(result.data.Error);
      }
    } catch (error) {
      console.error('Error fetching salary count:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    if (confirmDelete) {
      try {
        const result = await axios.delete(`http://localhost:3000/auth/delete_admin/${id}`);
        if (result.data.Status) {
          setAdmins(admins.filter(admin => admin.id !== id)); 
        } else {
          alert(result.data.Error);
        }
      } catch (error) {
        console.error('Error deleting admin:', error);
        alert('Failed to delete admin');
      }
    }
  };

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Total Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>$ {salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3 className='d-flex justify-content-center align-items-center'>Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr key={a.id}>
                  <td>{a.email}</td>
                  <td>
                    <button 
                      className="btn btn-info btn-sm me-2" 
                      onClick={() => navigate(`/dashboard/edit_admin/${a.id}`)} 
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(a.id)} 
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;