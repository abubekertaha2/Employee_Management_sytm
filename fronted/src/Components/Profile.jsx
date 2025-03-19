
import profilePicture from "../assets/img.jpg";

const Profile = () => {
    const employee = {
        name: "Abubeker Taha",
        id: "E123",
        jobTitle: "Software Engineer",
        department: "Development",
        profilePicture: profilePicture,
        email: "abu.doe@example.com",
        phone: "xxx-xxx-xx",
        dateOfHire: "2021-01-15",
        status: "Full-Time",
        skills: ["JavaScript", "React", "Node.js", "Python"],
        projects: ["Project A", "Project B"],
        manager: {
            name: "Abubeker Taha",
            jobTitle: "Development Manager",
            email: "abubekertaha3@gmail.com",
            phone: "098-765-4321",
            department: "Management"
        }
    };

    return (
        <div className="profile-container" style={styles.container}>
            <img 
                src={employee.profilePicture} 
                alt={`${employee.name}'s profile`} 
                style={styles.profileImage} 
            />
 
            <h2>{employee.name}</h2>
            <p><strong>ID:</strong> {employee.id}</p>
            <p><strong>Job Title:</strong> {employee.jobTitle}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <section>
                <h3>Contact Information</h3>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Phone:</strong> {employee.phone}</p>
            </section>
            <section>
                <h3>Manager Information</h3>
                <p><strong>Manager Name:</strong> {employee.manager.name}</p>
                <p><strong>Manager Job Title:</strong> {employee.manager.jobTitle}</p>
                <p><strong>Manager Email:</strong> {employee.manager.email}</p>
                <p><strong>Manager Phone:</strong> {employee.manager.phone}</p>
                <p><strong>Manager Department:</strong> {employee.manager.department}</p>
            </section>
            <section>
                <h3>Employment Details</h3>
                <p><strong>Date of Hire:</strong> {employee.dateOfHire}</p>
                <p><strong>Status:</strong> {employee.status}</p>
            </section>

            <section>
                <h3>Skills</h3>
                <ul>
                    {employee.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h3>Projects</h3>
                <ul>
                    {employee.projects.map((project) => (
                        <li key={project}>{project}</li>
                    ))}
                </ul>
            </section>

            <div style={styles.buttonContainer}>
                <button style={styles.button}>Edit Profile</button>
                <button style={{ ...styles.button, marginLeft: "10px" }}>Change Password</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '800px',
        margin: 'auto',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
    },
    profileImage: {
        borderRadius: '50%',
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        display: 'block',
        margin: '0 auto 20px',
    },
    buttonContainer: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    button: {
        padding: '10px 20px',
        fontSize: '14px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
};

export default Profile;