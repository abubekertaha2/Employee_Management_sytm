// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AddCategory = () => {
//     const [category, setCategory] = useState(''); // Initialize with an empty string
//     const [error, setError] = useState(''); // For error messages
//     const [loading, setLoading] = useState(false); // For loading state
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setLoading(true); // Set loading state to true
//         setError(''); // Reset any previous error

//         axios.post('http://localhost:3000/auth/add_category', { category })
//             .then(result => {
//                 setLoading(false); // Reset loading state
//                 if (result.data.Status) {
//                     navigate('/dashboard/category');
//                 } else {
//                     setError(result.data.Error); // Set error message
//                 }
//             })
//             .catch(err => {
//                 setLoading(false); // Reset loading state
//                 console.error(err);
//                 setError('An error occurred while adding the category.'); // Generic error message
//             });
//     };

//     return (
//         <div className='d-flex justify-content-center align-items-center h-75'>
//             <div className='p-3 rounded w-25 border'>
//                 <h2>Add Category</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                         <label htmlFor="category"><strong>Category:</strong></label>
//                         <input
//                             type="text"
//                             name='category'
//                             placeholder='Enter Category'
//                             value={category} // Controlled input
//                             onChange={(e) => setCategory(e.target.value)}
//                             className='form-control rounded-0'
//                         />
//                     </div>
//                     {error && <div className="text-danger mb-2">{error}</div>} {/* Display error message */}
//                     <button className='btn btn-success w-100 rounded-0 mb-2' disabled={loading}>
//                         {loading ? 'Adding...' : 'Add Category'} {/* Loading state in button */}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddCategory;
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [category, setCategory] = useState(''); // Initialize as an empty string
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_category', { name: category }) // Use 'name' instead of 'category'
        .then(result => {
            if (result.data.Status) {
                navigate('/dashboard/category');
            } else {
                alert(result.data.Error);
            }
        })
        .catch(err => {
            console.error(err); // Log the error for debugging
            alert("An error occurred while adding the category."); // User-friendly message
        });
    };

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Category:</strong></label>
                        <input 
                            type="text" 
                            name='category' 
                            placeholder='Enter Category'
                            onChange={(e) => setCategory(e.target.value)} 
                            className='form-control rounded-0' 
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;