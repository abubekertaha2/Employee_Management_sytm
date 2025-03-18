// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Employee = () => {
//   const [employee, setEmployee] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEmployees = async () => { 
//       try {
//         const result = await axios.get("http://localhost:3000/auth/employee");
//         if (result.data.Status) {
//           setEmployee(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       } catch (err) {
//         console.log(err);
//         alert("Failed to fetch employee data.");
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const result = await axios.delete('http://localhost:3000/auth/delete_employee/' + id);
//       if (result.data.Status) {
//         setEmployee(employee.filter(e => e.id !== id)); 
//       } else {
//         alert(result.data.Error);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Failed to delete employee."); 
//     }
//   };

//   return (
//     <div className="px-5 mt-3">
//       <div className="d-flex justify-content-center">
//         <h3>Employee List</h3>
//       </div>
//       <Link to="/dashboard/add_employee" className="btn btn-success">
//         Add Employee
//       </Link>
//       <div className="mt-3">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Address</th>
//               <th>Salary</th>
//               <th>Image</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employee.map((e) => (
//               <tr key={e.id}>
//                 <td>{e.name}</td>
                
//                 <td>{e.email}</td>
//                 <td>{e.address}</td>
//                 <td>{e.salary}</td>
//                 <td>
//                   <img
//                     src={`http://localhost:3000/Images/` + e.image}
//                     alt={e.name}
//                     className="employee_image"
//                   />
//                 </td>
//                 <td>
//                   <Link
//                     to={`/dashboard/edit_employee/` + e.id}
//                     className="btn btn-info btn-sm me-2"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     className="btn btn-warning btn-sm"
//                     onClick={() => handleDelete(e.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Employee;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await axios.get("http://localhost:3000/auth/employee");
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      } catch (err) {
        console.log(err);
        alert("Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const result = await axios.delete('http://localhost:3000/auth/delete_employee/' + id);
        if (result.data.Status) {
          setEmployee(employee.filter(e => e.id !== id)); 
        } else {
          alert(result.data.Error);
        }
      } catch (err) {
        console.log(err);
        alert("Failed to delete employee."); 
      }
    }
  };

  return (
    <div className="px-5 mt-3">
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <h3>Employee List</h3>
          </div>
          <Link to="/dashboard/add_employee" className="btn btn-success">
            Add Employee
          </Link>
          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Salary</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.address}</td>
                    <td>{e.salary}</td>
                    <td>
                      <img
                        src={`http://localhost:3000/Images/` + e.image}
                        alt={e.name}
                        className="employee_image"
                      />
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/edit_employee/` + e.id}
                        className="btn btn-info btn-sm me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleDelete(e.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Employee;