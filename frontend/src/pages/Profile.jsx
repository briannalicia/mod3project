import Journal from "../components/Journal";


function Profile({ username, email }) {
    return ( 
        <div>
            <h1>Profile</h1>
            <p>username: {username}</p>
            <p>email: {email}</p>
            
        
        <br></br>
        <Journal />
        </div>
        
     );
}

export default Profile;