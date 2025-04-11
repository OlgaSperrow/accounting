import ProfileData from "./ProfileData.tsx";
import UpdateUser from "./UpdateUser.tsx";

const Profile = () => {
    const handleClickLogout = () => {
        //TODO
        alert("logout")
    }
    return (
        <>
            <ProfileData/>
            <button onClick={handleClickLogout}>Logout</button>
            <UpdateUser/>
        </>
    );
};

export default Profile;